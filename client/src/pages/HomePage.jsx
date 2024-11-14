import { useEffect, useState } from "react";
import Sidebar from "../components/Sidebar";
import { Header } from "../components/Header";
import { useMatchStore } from "../store/useMatchStore";
import { Frown, Quote } from "lucide-react"; // Importing a quote icon for a touch of style

import SwipeArea from "../components/SwipeArea";
import SwipeFeedback from "../components/SwipeFeedback";
import { useAuthStore } from "../store/useAuthStore";

const quotes = [
	"Success usually comes to those who are too busy to be looking for it.",
	"Don’t limit your challenges, challenge your limits.",
	"Strength does not come from physical capacity. It comes from an indomitable will.",
	"The only bad workout is the one you didn’t do.",
	"Push yourself because no one else is going to do it for you.",
];

const HomePage = () => {
	const { isLoadingUserProfiles, getUserProfiles, userProfiles, subscribeToNewMatches, unsubscribeFromNewMatches } =
		useMatchStore();
	const { authUser } = useAuthStore();
	const [quote, setQuote] = useState("");

	useEffect(() => {
		const randomQuote = quotes[Math.floor(Math.random() * quotes.length)];
		setQuote(randomQuote);
		getUserProfiles();
	}, [getUserProfiles]);

	useEffect(() => {
		authUser && subscribeToNewMatches();
		return () => {
			unsubscribeFromNewMatches();
		};
	}, [subscribeToNewMatches, unsubscribeFromNewMatches, authUser]);

	return (
		<div className='flex flex-col lg:flex-row min-h-screen bg-black overflow-hidden'>
			<Sidebar />
			<div className='flex-grow flex flex-col overflow-hidden'>
				<Header />
				<main className='flex-grow flex flex-col gap-10 justify-center items-center p-4 relative overflow-hidden'>
					{/* Quote Section */}
					<div className='text-center mb-4 px-4'>
						<div className="flex items-center justify-center space-x-2">
							<Quote size={24} className="text-orange-500" />
							<p className='text-xl italic font-semibold text-orange-300'>" {quote} "</p>
							<Quote size={24} className="text-orange-500 rotate-180" />
						</div>
					</div>

					{/* Swipe Area */}
					{userProfiles.length > 0 && !isLoadingUserProfiles && (
						<>
							<SwipeArea />
							<SwipeFeedback />
						</>
					)}

					{/* No More Profiles */}
					{userProfiles.length === 0 && !isLoadingUserProfiles && <NoMoreProfiles />}

					{/* Loading UI */}
					{isLoadingUserProfiles && <LoadingUI />}
				</main>
			</div>
		</div>
	);
};
export default HomePage;

const NoMoreProfiles = () => (
	<div className='flex flex-col items-center justify-center h-full text-center p-8'>
		<Frown className='text-orange-400 mb-6' size={80} />
		<h2 className='text-3xl font-bold text-gray-800 mb-4'>Out of Matches for Now!</h2>
		<p className='text-xl text-gray-600 mb-6'>Take a break and crush a workout. New profiles will be ready when you are!</p>
		<p className='text-lg text-orange-500 font-semibold'>💪 Time to hit the weights 💪</p>
	</div>
);

const LoadingUI = () => (
	<div className='relative w-full max-w-sm h-[28rem]'>
		<div className='card bg-white w-96 h-[28rem] rounded-lg overflow-hidden border border-gray-200 shadow-sm'>
			<div className='px-4 pt-4 h-3/4'>
				<div className='w-full h-full bg-gray-200 rounded-lg' />
			</div>
			<div className='card-body bg-gradient-to-b from-white to-orange-50 p-4'>
				<div className='space-y-2'>
					<div className='h-6 bg-gray-200 rounded w-3/4' />
					<div className='h-4 bg-gray-200 rounded w-1/2' />
				</div>
			</div>
		</div>
	</div>
);
