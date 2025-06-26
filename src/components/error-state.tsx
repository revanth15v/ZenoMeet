
import { useState, useEffect } from "react";

interface ErrorStateProps {
	title: string;
	description: string;
	onRetry?: () => void;
	onClose?: () => void;
}

export const ErrorState = ({ title, description, onRetry, onClose }: ErrorStateProps) => {
	const [isVisible, setIsVisible] = useState(false);
	const [pulseCount, setPulseCount] = useState(0);

	useEffect(() => {
		setIsVisible(true);
		const interval = setInterval(() => {
			setPulseCount(prev => prev + 1);
		}, 2000);
		
		return () => clearInterval(interval);
	}, []);

	// Custom Alert Circle Icon (since lucide-react isn't available)
	const AlertIcon = () => (
		<svg 
			className="w-16 h-16 text-red-500" 
			fill="none" 
			stroke="currentColor" 
			viewBox="0 0 24 24"
		>
			<circle cx="12" cy="12" r="10" strokeWidth="2"/>
			<line x1="12" y1="8" x2="12" y2="12" strokeWidth="2"/>
			<circle cx="12" cy="16" r="0.5" fill="currentColor"/>
		</svg>
	);

	const glitchBars = Array.from({ length: 5 }, (_, i) => (
		<div
			key={i}
			className="absolute bg-red-500/20 h-1 animate-pulse"
			style={{
				left: `${10 + i * 15}%`,
				width: `${8 + Math.random() * 12}%`,
				top: `${20 + i * 15}%`,
				animationDelay: `${i * 0.3}s`,
				animationDuration: `${1.5 + Math.random()}s`
			}}
		/>
	));

	return (
		<div className="py-8 px-8 flex flex-1 items-center justify-center min-h-screen bg-gradient-to-br from-red-50 via-orange-50 to-yellow-50">
			{/* Animated background elements */}
			<div className="absolute inset-0 overflow-hidden pointer-events-none">
				{/* Floating warning triangles */}
				{Array.from({ length: 6 }, (_, i) => (
					<div
						key={i}
						className="absolute opacity-10"
						style={{
							left: `${Math.random() * 100}%`,
							top: `${Math.random() * 100}%`,
							animation: `float ${3 + Math.random() * 2}s ease-in-out infinite`,
							animationDelay: `${Math.random() * 2}s`
						}}
					>
						<svg className="w-8 h-8 text-red-400" fill="currentColor" viewBox="0 0 24 24">
							<path d="M12 2L2 22h20L12 2zm0 6l6 10H6l6-10z"/>
						</svg>
					</div>
				))}
			</div>

			<div className={`relative z-10 transition-all duration-1000 ${
				isVisible ? 'opacity-100 transform translate-y-0' : 'opacity-0 transform translate-y-8'
			}`}>
				<div className="flex flex-col items-center justify-center gap-y-8 bg-white/90 backdrop-blur-xl rounded-3xl p-12 shadow-2xl border border-red-100 max-w-lg mx-auto relative overflow-hidden">
					
					{/* Glitch effect bars */}
					<div className="absolute inset-0 pointer-events-none">
						{glitchBars}
					</div>

					{/* Main error icon with animations */}
					<div className="relative">
						{/* Pulsing rings */}
						<div className="absolute inset-0 flex items-center justify-center">
							<div className={`w-20 h-20 border-2 border-red-300 rounded-full animate-ping transition-all duration-1000 ${
								pulseCount % 2 === 0 ? 'opacity-30' : 'opacity-60'
							}`}></div>
							<div className={`absolute w-24 h-24 border border-red-200 rounded-full animate-pulse transition-all duration-1500 ${
								pulseCount % 3 === 0 ? 'scale-110' : 'scale-100'
							}`}></div>
						</div>
						
						{/* Icon container with shake animation */}
						<div className="relative z-10 animate-bounce-gentle">
							<div className="bg-red-100 p-4 rounded-full shadow-lg">
								<AlertIcon />
							</div>
						</div>

						{/* Floating error particles */}
						{Array.from({ length: 4 }, (_, i) => (
							<div
								key={i}
								className="absolute w-2 h-2 bg-red-400 rounded-full opacity-60"
								style={{
									top: `${30 + Math.sin(Date.now() / 1000 + i) * 20}%`,
									left: `${30 + Math.cos(Date.now() / 1000 + i) * 20}%`,
									animation: `float ${2 + i * 0.5}s ease-in-out infinite`,
									animationDelay: `${i * 0.3}s`
								}}
							/>
						))}
					</div>

					{/* Content section */}
					<div className="flex flex-col gap-y-4 text-center">
						<h2 className="text-3xl font-bold text-gray-800 animate-fade-in">
							{title}
						</h2>
						<p className="text-gray-600 leading-relaxed max-w-sm animate-fade-in-delay">
							{description}
						</p>
					</div>

					{/* Action buttons */}
					<div className="flex flex-col sm:flex-row gap-4 w-full max-w-sm">
						{onRetry && (
							<button
								onClick={onRetry}
								className="flex-1 bg-gradient-to-r from-red-500 to-red-600 text-white px-6 py-3 rounded-xl font-semibold hover:from-red-600 hover:to-red-700 transform hover:scale-105 transition-all duration-200 shadow-lg hover:shadow-xl"
							>
								<span className="flex items-center justify-center gap-2">
									<svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
										<path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
									</svg>
									Try Again
								</span>
							</button>
						)}
						{onClose && (
							<button
								onClick={onClose}
								className="flex-1 bg-gray-100 text-gray-700 px-6 py-3 rounded-xl font-semibold hover:bg-gray-200 transform hover:scale-105 transition-all duration-200"
							>
								Dismiss
							</button>
						)}
					</div>

					{/* Helpful tip section */}
					<div className="bg-blue-50 border border-blue-200 rounded-xl p-4 w-full">
						<div className="flex items-start gap-3">
							<div className="bg-blue-100 p-1 rounded-full flex-shrink-0">
								<svg className="w-4 h-4 text-blue-600" fill="currentColor" viewBox="0 0 24 24">
									<path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z"/>
								</svg>
							</div>
							<div>
								<h4 className="font-semibold text-blue-800 text-sm">Quick Fix</h4>
								<p className="text-blue-600 text-xs mt-1">
									Check your internet connection or try refreshing the page
								</p>
							</div>
						</div>
					</div>

					{/* Decorative elements */}
					<div className="absolute -top-2 -right-2 w-6 h-6 bg-gradient-to-r from-red-400 to-orange-400 rounded-full opacity-70 animate-bounce delay-300"></div>
					<div className="absolute -bottom-2 -left-2 w-4 h-4 bg-gradient-to-r from-yellow-400 to-red-400 rounded-full opacity-70 animate-bounce delay-700"></div>
				</div>
			</div>

			<style jsx>{`
				@keyframes float {
					0%, 100% { transform: translateY(0px) rotate(0deg); }
					50% { transform: translateY(-10px) rotate(180deg); }
				}
				
				@keyframes bounce-gentle {
					0%, 100% { transform: translateY(0px); }
					50% { transform: translateY(-5px); }
				}
				
				@keyframes fade-in {
					from { opacity: 0; transform: translateY(10px); }
					to { opacity: 1; transform: translateY(0); }
				}
				
				@keyframes fade-in-delay {
					from { opacity: 0; transform: translateY(10px); }
					to { opacity: 1; transform: translateY(0); }
				}
				
				.animate-bounce-gentle {
					animation: bounce-gentle 2s ease-in-out infinite;
				}
				
				.animate-fade-in {
					animation: fade-in 0.8s ease-out;
				}
				
				.animate-fade-in-delay {
					animation: fade-in-delay 0.8s ease-out 0.3s both;
				}
			`}</style>
		</div>
	);
};

// Demo component to show the error state
export default function ErrorDemo() {
	return (
		<ErrorState 
			title="Oops! Something went wrong"
			description="We encountered an unexpected error while processing your request. Don't worry, our team has been notified and we're working on a fix."
			onRetry={() => console.log('Retry clicked')}
			onClose={() => console.log('Close clicked')}
		/>
	);
}