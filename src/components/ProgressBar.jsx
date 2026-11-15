// ProgressBar.jsx - Reusable visual progress bar
function ProgressBar({ percentage = 0, label = "Today's Progress" }) {
  // Ensure percentage stays between 0 and 100
  const clampedPercentage = Math.min(100, Math.max(0, Math.round(percentage)));

  return (
    <div className="progress-bar-container">
      <div className="progress-bar-header">
        <span className="progress-bar-label">{label}</span>
        <span className="progress-bar-percent">{clampedPercentage}%</span>
      </div>

      <div className="progress-bar-track" role="progressbar" aria-valuenow={clampedPercentage} aria-valuemin="0" aria-valuemax="100">
        <div
          className="progress-bar-fill"
          style={{ width: `${clampedPercentage}%` }}
        />
      </div>
    </div>
  );
}

export default ProgressBar;
