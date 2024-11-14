import { useMatchStore } from "../store/useMatchStore";

const getFeedbackStyle = (swipeFeedback) => {
	if (swipeFeedback === "liked") return "text-green-500";
	if (swipeFeedback === "passed") return "text-red-500";
	if (swipeFeedback === "matched") return "text-orange-500";
	return "";
};

const getFeedbackText = (swipeFeedback) => {
	if (swipeFeedback === "liked") return "Spotted!";
	if (swipeFeedback === "passed") return "Not My Pace";
	if (swipeFeedback === "matched") return "Workout Buddy Found!";
	return "";
};

const SwipeFeedback = () => {
	const { swipeFeedback } = useMatchStore();

	return (
		<div
			className={`
		absolute top-10 left-0 right-0 text-center text-2xl font-bold ${getFeedbackStyle(swipeFeedback)}
		`}
		>
			{getFeedbackText(swipeFeedback)}
		</div>
	);
};
export default SwipeFeedback;
