const { v4: uuidv4 } = require('uuid');

class GoGame {
  constructor(size = 19) {
    this.id = uuidv4();
    this.size = size;
    this.board = Array(size).fill().map(() => Array(size).fill(0)); // 0: empty, 1: black, 2: white
    this.currentPlayer = 1; // 1: black, 2: white
    this.capturedStones = { black: 0, white: 0 };
    this.moveHistory = [];
    this.passCount = 0;
    this.gameEnded = false;
    this.koPosition = null; // For ko rule
    this.territory = null;
    this.finalScore = null;
  }

  // Check if a position is valid
  isValidPosition(x, y) {
    return x >= 0 && x < this.size && y >= 0 && y < this.size;
  }

  // Get adjacent positions
  getAdjacent(x, y) {
    const adjacent = [];
    const directions = [[-1, 0], [1, 0], [0, -1], [0, 1]];
    
    for (const [dx, dy] of directions) {
      const nx = x + dx;
      const ny = y + dy;
      if (this.isValidPosition(nx, ny)) {
        adjacent.push([nx, ny]);
      }
    }
    return adjacent;
  }

  // Get a group of connected stones
  getGroup(x, y, visited = new Set()) {
    const key = `${x},${y}`;
    if (visited.has(key)) return [];
    
    visited.add(key);
    const color = this.board[x][y];
    if (color === 0) return [];
    
    const group = [[x, y]];
    
    for (const [nx, ny] of this.getAdjacent(x, y)) {
      if (this.board[nx][ny] === color) {
        group.push(...this.getGroup(nx, ny, visited));
      }
    }
    
    return group;
  }

  // Check if a group has liberties (empty adjacent spaces)
  hasLiberties(group) {
    for (const [x, y] of group) {
      for (const [nx, ny] of this.getAdjacent(x, y)) {
        if (this.board[nx][ny] === 0) {
          return true;
        }
      }
    }
    return false;
  }

  // Remove captured stones
  removeGroup(group) {
    const color = this.board[group[0][0]][group[0][1]];
    for (const [x, y] of group) {
      this.board[x][y] = 0;
    }
    
    if (color === 1) {
      this.capturedStones.white += group.length;
    } else {
      this.capturedStones.black += group.length;
    }
    
    return group.length;
  }

  // Check for captures after a move
  checkCaptures(x, y) {
    const opponent = this.currentPlayer === 1 ? 2 : 1;
    let capturedCount = 0;
    
    for (const [nx, ny] of this.getAdjacent(x, y)) {
      if (this.board[nx][ny] === opponent) {
        const group = this.getGroup(nx, ny);
        if (!this.hasLiberties(group)) {
          capturedCount += this.removeGroup(group);
        }
      }
    }
    
    return capturedCount;
  }

  // Create a copy of the board state
  getBoardState() {
    return this.board.map(row => [...row]);
  }

  // Check if move violates ko rule
  violatesKo(x, y) {
    if (!this.koPosition) return false;
    
    // Make temporary move
    const originalBoard = this.getBoardState();
    this.board[x][y] = this.currentPlayer;
    this.checkCaptures(x, y);
    
    const boardMatches = JSON.stringify(this.board) === JSON.stringify(this.koPosition);
    
    // Restore board
    this.board = originalBoard;
    
    return boardMatches;
  }

  // Make a move
  makeMove(x, y) {
    if (this.gameEnded) {
      return { success: false, error: 'Game has ended' };
    }

    if (!this.isValidPosition(x, y)) {
      return { success: false, error: 'Invalid position' };
    }

    if (this.board[x][y] !== 0) {
      return { success: false, error: 'Position already occupied' };
    }

    // Check suicide rule (can't place stone with no liberties unless it captures)
    const tempBoard = this.getBoardState();
    this.board[x][y] = this.currentPlayer;
    
    const capturedCount = this.checkCaptures(x, y);
    const ownGroup = this.getGroup(x, y);
    const suicide = !this.hasLiberties(ownGroup) && capturedCount === 0;
    
    if (suicide) {
      this.board = tempBoard;
      return { success: false, error: 'Suicide move not allowed' };
    }

    // Check ko rule
    if (this.violatesKo(x, y)) {
      this.board = tempBoard;
      return { success: false, error: 'Ko rule violation' };
    }

    // Store board state for ko rule
    this.koPosition = capturedCount > 0 ? this.getBoardState() : null;

    // Record move
    this.moveHistory.push({
      player: this.currentPlayer,
      x, y,
      captured: capturedCount,
      timestamp: Date.now()
    });

    this.passCount = 0;
    this.currentPlayer = this.currentPlayer === 1 ? 2 : 1;

    return { 
      success: true, 
      captured: capturedCount,
      gameState: this.getGameState()
    };
  }

  // Pass turn
  pass() {
    if (this.gameEnded) {
      return { success: false, error: 'Game has ended' };
    }

    this.passCount++;
    this.moveHistory.push({
      player: this.currentPlayer,
      pass: true,
      timestamp: Date.now()
    });

    if (this.passCount >= 2) {
      this.endGame();
    }

    this.currentPlayer = this.currentPlayer === 1 ? 2 : 1;

    return { 
      success: true, 
      gameEnded: this.gameEnded,
      gameState: this.getGameState()
    };
  }

  // Calculate territory (simplified Chinese rules)
  calculateTerritory() {
    const territory = Array(this.size).fill().map(() => Array(this.size).fill(0));
    const visited = new Set();
    let blackTerritory = 0;
    let whiteTerritory = 0;

    for (let x = 0; x < this.size; x++) {
      for (let y = 0; y < this.size; y++) {
        const key = `${x},${y}`;
        if (this.board[x][y] === 0 && !visited.has(key)) {
          const emptyGroup = this.getEmptyGroup(x, y, visited);
          const surroundingColors = this.getSurroundingColors(emptyGroup);
          
          if (surroundingColors.size === 1) {
            const owner = [...surroundingColors][0];
            for (const [ex, ey] of emptyGroup) {
              territory[ex][ey] = owner;
            }
            
            if (owner === 1) {
              blackTerritory += emptyGroup.length;
            } else {
              whiteTerritory += emptyGroup.length;
            }
          }
        }
      }
    }

    return { territory, blackTerritory, whiteTerritory };
  }

  // Get empty territory group
  getEmptyGroup(x, y, visited) {
    const key = `${x},${y}`;
    if (visited.has(key) || this.board[x][y] !== 0) return [];
    
    visited.add(key);
    const group = [[x, y]];
    
    for (const [nx, ny] of this.getAdjacent(x, y)) {
      if (this.board[nx][ny] === 0) {
        group.push(...this.getEmptyGroup(nx, ny, visited));
      }
    }
    
    return group;
  }

  // Get colors surrounding an empty group
  getSurroundingColors(emptyGroup) {
    const colors = new Set();
    
    for (const [x, y] of emptyGroup) {
      for (const [nx, ny] of this.getAdjacent(x, y)) {
        if (this.board[nx][ny] !== 0) {
          colors.add(this.board[nx][ny]);
        }
      }
    }
    
    return colors;
  }

  // End game and calculate final score
  endGame() {
    this.gameEnded = true;
    const territoryResult = this.calculateTerritory();
    this.territory = territoryResult.territory;
    
    // Count stones on board
    let blackStones = 0;
    let whiteStones = 0;
    
    for (let x = 0; x < this.size; x++) {
      for (let y = 0; y < this.size; y++) {
        if (this.board[x][y] === 1) blackStones++;
        if (this.board[x][y] === 2) whiteStones++;
      }
    }

    // Calculate final score (Chinese rules: stones + territory)
    const blackScore = blackStones + territoryResult.blackTerritory;
    const whiteScore = whiteStones + territoryResult.whiteTerritory;
    
    this.finalScore = {
      black: {
        stones: blackStones,
        territory: territoryResult.blackTerritory,
        total: blackScore
      },
      white: {
        stones: whiteStones,
        territory: territoryResult.whiteTerritory,
        total: whiteScore
      },
      winner: blackScore > whiteScore ? 'black' : whiteScore > blackScore ? 'white' : 'tie'
    };
  }

  // Get current game state
  getGameState() {
    return {
      id: this.id,
      size: this.size,
      board: this.board,
      currentPlayer: this.currentPlayer,
      capturedStones: this.capturedStones,
      moveCount: this.moveHistory.length,
      passCount: this.passCount,
      gameEnded: this.gameEnded,
      territory: this.territory,
      finalScore: this.finalScore
    };
  }

  // Get current game score
  getCurrentScore() {
    const territoryResult = this.calculateTerritory();

    let blackStones = 0;
    let whiteStones = 0;

    for (let x = 0; x < this.size; x++) {
      for (let y = 0; y < this.size; y++) {
        if (this.board[x][y] === 1) blackStones++;
        if (this.board[x][y] === 2) whiteStones++;
      }
    }

    const blackTotal = blackStones + this.capturedStones.black + territoryResult.blackTerritory;
    const whiteTotal = whiteStones + this.capturedStones.white + territoryResult.whiteTerritory;

    return {
      black: {
        stones: blackStones,
        captured: this.capturedStones.black,
        territory: territoryResult.blackTerritory,
        total: blackTotal
      },
      white: {
        stones: whiteStones,
        captured: this.capturedStones.white,
        territory: territoryResult.whiteTerritory,
        total: whiteTotal
      },
      winner: blackTotal > whiteTotal ? 'black' : whiteTotal > blackTotal ? 'white' : 'tie'
    };
  }
}

module.exports = GoGame;
