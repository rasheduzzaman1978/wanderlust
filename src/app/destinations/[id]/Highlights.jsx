const highlights = [
  "Luxury hotel accommodation",
  "Visit famous tourist attractions",
  "Professional local guide service",
  "Free airport pickup & drop",
  "Traditional local food experience",
  "24/7 customer support",
];

const Highlights = () => {

  return (
    <div className="mt-10">

      <h2 className="mb-5 text-2xl font-bold text-gray-900">

        Highlights

      </h2>

      <div className="grid grid-cols-1 gap-4 text-gray-600 md:grid-cols-2">

        {highlights.map(item => (
          <div
            key={item}
            className="flex items-start gap-2"
          >

            <span className="mt-1 text-green-500">
              ✔
            </span>

            <p>{item}</p>

          </div>
        ))}

      </div>
    </div>
  );
};

export default Highlights;