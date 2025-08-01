import React from "react";
function LiveReports() {
    // Dummy raporlar ayrıca bir API'den çekilebilir
    const reports = [
        {id:1, msg:"Server update 12:00 UTC"},
        {id:2, msg:"New puzzles added!"},
        {id:3, msg:"Maintenance 02/08"}
    ];
    return (
        <div className="bg-dark bg-opacity-75 p-3 rounded shadow ms-3" style={{minWidth:120}}>
            <div className="fw-bold text-secondary mb-2">GO</div>
            <ul className="list-unstyled mb-0 small">
                {reports.map(r => <li key={r.id} className="text-info">{r.msg}</li>)}
            </ul>
        </div>
    );
}
export default LiveReports;