export const MonthSelector = ({ 
  months, 
  activeMonth, 
  setActiveMonth 
}: { 
  months: string[]; 
  activeMonth: string | null; 
  setActiveMonth: (month: string) => void 
}) => (
  <div className="flex flex-wrap justify-center gap-2 mb-8">
    {months.map(month => (
      <button
        key={month}
        className={`px-4 py-2 rounded-lg transition-all ${
          activeMonth === month
            ? 'bg-indigo-600 text-white shadow-md transform scale-105'
            : 'bg-white text-indigo-700 hover:bg-indigo-100'
        }`}
        onClick={() => setActiveMonth(month)}
      >
        {month}
      </button>
    ))}
  </div>
);