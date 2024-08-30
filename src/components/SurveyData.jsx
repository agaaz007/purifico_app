const SurveyData = () => {
  const surveyItems = [
    {
      percentage: 82,
      description: "people use hand-dryers to dry their hands",
    },
    {
      percentage: 85,
      description: "don't know about the potential threats of a hand-dryer",
    },
    {
      percentage: 85,
      description:
        "found it very discomforting after they got to know about the fact",
    },
    {
      percentage: 85,
      description:
        "people were ready to spend a few extra seconds for clean air",
    },
  ];

  return (
    <div className="text-white w-full mt-10">
      <div className="w-full px-4 sm:px-6 lg:px-8 py-12">
        <hr className="mb-4 opacity-20" />
        <h2 className="text-3xl font-SuisseIntlRegular text-center mb-8">
          Our Survey
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {surveyItems.map((item, index) => (
            <div key={index} className="p-6 rounded-lg">
              <div className="text-8xl font-bold mb-2 font-SuisseIntlRegular">
                {item.percentage}%
              </div>
              <p className="text-sm text-gray-300 font-sourcecodepro">
                {item.description}
              </p>
            </div>
          ))}
        </div>
        <p className="text-center text-gray-400 mt-6 text-sm">
          Sample size: 150 people.
        </p>
        <hr className="mt-4 opacity-20" />
      </div>
    </div>
  );
};

export default SurveyData;
