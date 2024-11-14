import { useState, useEffect } from "react";
import { Header } from "../components/Header";

const muscleExercises = {
  chest: ["Bench Press", "Push-Ups", "Chest Flyes"],
  back: ["Pull-Ups", "Deadlifts", "Bent-Over Rows"],
  legs: ["Squats", "Lunges", "Leg Press"],
  shoulders: ["Overhead Press", "Lateral Raises", "Face Pulls"],
  arms: ["Bicep Curls", "Tricep Extensions", "Hammer Curls"],
  biceps: ["Bicep Curls", "Hammer Curls", "Concentration Curls"],
  triceps: ["Tricep Extensions", "Tricep Pushdowns", "Skull Crushers"],
  core: ["Planks", "Russian Twists", "Bicycle Crunches"],
};

const ProgramPlanner = () => {
  const [weekPlan, setWeekPlan] = useState({
    Monday: "",
    Tuesday: "",
    Wednesday: "",
    Thursday: "",
    Friday: "",
    Saturday: "",
    Sunday: "",
  });
  const [generatedPlan, setGeneratedPlan] = useState({});
  const [loading, setLoading] = useState(false);

  // Load plan from local storage on initial render
  useEffect(() => {
    const savedPlan = localStorage.getItem("weekPlan");
    const savedGeneratedPlan = localStorage.getItem("generatedPlan");
    if (savedPlan) setWeekPlan(JSON.parse(savedPlan));
    if (savedGeneratedPlan) setGeneratedPlan(JSON.parse(savedGeneratedPlan));
  }, []);

  const generatePlan = () => {
    setLoading(true);
    const newPlan = {};

    for (const [day, muscle] of Object.entries(weekPlan)) {
      if (muscleExercises[muscle.toLowerCase()]) {
        newPlan[day] = muscleExercises[muscle.toLowerCase()];
      } else {
        newPlan[day] = ["Rest or choose a valid muscle group"];
      }
    }

    setGeneratedPlan(newPlan);
    localStorage.setItem("generatedPlan", JSON.stringify(newPlan)); // Save generated plan
    setLoading(false);
  };

  const handleInputChange = (day, value) => {
    const updatedPlan = {
      ...weekPlan,
      [day]: value,
    };
    setWeekPlan(updatedPlan);
    localStorage.setItem("weekPlan", JSON.stringify(updatedPlan)); // Save week plan
  };

  // Clear local storage on logout (this function would be called on logout)
  const handleLogout = () => {
    localStorage.removeItem("weekPlan");
    localStorage.removeItem("generatedPlan");
  };

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      <Header />
      <div className="flex-grow flex flex-col justify-center items-center p-4">
        <h2 className="text-3xl font-bold text-gray-800 mb-6">Weekly Program Planner</h2>

        <div className="w-full max-w-md bg-white p-6 rounded-lg shadow-lg">
          {Object.keys(weekPlan).map((day) => (
            <div key={day} className="mb-4">
              <label className="block text-gray-700 font-semibold mb-2">{day}</label>
              <input
                type="text"
                placeholder="e.g., Chest, Back, Legs, Biceps, Triceps"
                value={weekPlan[day]}
                onChange={(e) => handleInputChange(day, e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-orange-500 focus:border-orange-500"
              />
            </div>
          ))}
          <button
            onClick={generatePlan}
            className="w-full bg-orange-600 text-white py-2 rounded-md hover:bg-orange-700 transition"
            disabled={loading}
          >
            {loading ? "Generating..." : "Get Weekly Plan"}
          </button>

          {Object.keys(generatedPlan).length > 0 && (
            <div className="mt-6">
              <h3 className="text-xl font-bold text-gray-800">Your Weekly Plan:</h3>
              <ul className="mt-4 space-y-4">
                {Object.entries(generatedPlan).map(([day, exercises]) => (
                  <li key={day} className="text-gray-700">
                    <strong>{day}:</strong> {exercises.join(", ")}
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ProgramPlanner;
