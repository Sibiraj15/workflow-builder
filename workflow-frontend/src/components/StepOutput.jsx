const StepOutput = ({ outputs }) => {
  if (!outputs.length) return null;

  return (
    <div style={{ marginTop: "30px" }}>
      <h3>Workflow Output</h3>

      {outputs.map((item, index) => (
        <div key={index} className="output-card">
          <strong>{item.step.toUpperCase()}</strong>
          <p>{item.result}</p>
        </div>
      ))}
    </div>
  );
};

export default StepOutput;
