export default function Sideup({title}) {
  return (
    <div className="h-100 sideup d-flex flex-column justify-content-between align-items-center py-5">
      <div>
        <p style={{ fontSize: "60px", fontFamily: "Roboto", color: "white" }}>
          {title}
        </p>
        <p style={{ width: "170px" }} className="text-center">
          to use all features of the application
        </p>
      </div>
      <div>
        <div style={{ marginBottom: "20px" }}>
          <i className="bi bi-check2-all px-3 rounded-circle text-success signup-side-bottom-tick-circle"></i>
        </div>
      </div>
    </div>
  );
}
