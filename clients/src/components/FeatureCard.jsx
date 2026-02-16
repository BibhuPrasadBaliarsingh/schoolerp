const FeatureCard = ({ title }) => {
  return (
    <div className="bg-white p-6 rounded shadow hover:scale-105 transition">
      <h3 className="text-lg font-semibold text-center">
        {title}
      </h3>
    </div>
  );
};

export default FeatureCard;
