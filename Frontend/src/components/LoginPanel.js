import React from "react";
function LoginPanel() { // Giriş paneli bileşeni ve veritabanı bağlantısı yok
    return (
        <div className="bg-dark bg-opacity-75 p-3 rounded shadow" style={{width: 220}}>
            <div className="fw-bold text-secondary mb-2">LOG IN</div>
            <form>
                <div className="mb-2">
                    <label className="form-label text-light">NAME:</label>
                    <input className="form-control form-control-sm" type="text" />
                </div>
                <div className="mb-2">
                    <label className="form-label text-light">PASSWORD:</label>
                    <input className="form-control form-control-sm" type="password" />
                </div>
                <button className="btn btn-primary btn-sm w-100 mt-1" type="submit">Log In</button>
            </form>
        </div>
    );
}
export default LoginPanel;