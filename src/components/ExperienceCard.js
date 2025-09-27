// ExperienceCard.js
function ExperienceCard({ icon, title, className = "" }) {
  return (
    <div
      className={`flex flex-col items-center space-x-3 p-4 rounded-2xl shadow-md pointer-events-auto bg-transparent hover:shadow-lg transition ${className}`}
    >
      {/* Icon or emoji */}
      <span className="text-2xl">{icon}</span>

      {/* Title */}
      <h3 className="text-lg font-semibold">{title}</h3>
    </div>
  );
}

export default ExperienceCard;
