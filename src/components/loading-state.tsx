import { useState, useEffect } from "react";

interface LoadingStateProps {
	title: string;
	description: string;
}

export const LoadingState = ({ title, description }: LoadingStateProps) => {
	const [particleCount, setParticleCount] = useState(0);
	const [pulsePhase, setPulsePhase] = useState(0);
	
	useEffect(() => {
		const interval = setInterval(() => {
			setParticleCount(prev => (prev + 1) % 8);
			setPulsePhase(prev => (prev + 1) % 4);
		}, 300);
		
		return () => clearInterval(interval);
	}, []);

	const particles = Array.from({ length: 12 }, (_, i) => (
		<div
			key={i}
			className={`absolute w-2 h-2 rounded-full transition-all duration-1000 ${
				i < particleCount ? 'bg-blue-400 opacity-100 scale-100' : 'bg-gray-300 opacity-30 scale-50'
			}`}
			style={{
				transform: `rotate(${i * 30}deg) translateY(-40px)`,
				transformOrigin: '50% 40px',
				animationDelay: `${i * 0.1}s`
			}}
		/>
	));

	return (
		<div className="py-4 px-8 flex flex-1 items-center justify-center min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100">
			{/* Animated background orbs */}
			<div className="absolute inset-0 overflow-hidden pointer-events-none">
				<div className="absolute top-1/4 left-1/4 w-96 h-96 bg-gradient-to-r from-blue-300/20 to-purple-300/20 rounded-full blur-3xl animate-pulse"></div>
				<div className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-gradient-to-r from-pink-300/20 to-blue-300/20 rounded-full blur-3xl animate-pulse delay-1000"></div>
				<div className="absolute top-1/2 left-1/2 w-64 h-64 bg-gradient-to-r from-indigo-300/20 to-cyan-300/20 rounded-full blur-3xl animate-pulse delay-500"></div>
			</div>
			
			<div className="relative z-10 flex flex-col items-center justify-center gap-y-8 bg-white/80 backdrop-blur-xl rounded-3xl p-12 shadow-2xl border border-white/20 max-w-md mx-auto">
				{/* Main loading animation container */}
				<div className="relative">
					{/* Outer rotating ring */}
					<div className="absolute inset-0 w-24 h-24 border-4 border-transparent border-t-blue-500 border-r-purple-500 rounded-full animate-spin"></div>
					
					{/* Particle orbit */}
					<div className="relative w-24 h-24 flex items-center justify-center">
						{particles}
					</div>
					
					{/* Central pulsing core */}
					<div className="absolute inset-0 w-24 h-24 flex items-center justify-center">
						<div className={`w-8 h-8 rounded-full bg-gradient-to-r from-blue-500 to-purple-600 shadow-lg transition-all duration-300 ${
							pulsePhase % 2 === 0 ? 'scale-125 shadow-blue-500/50' : 'scale-100 shadow-purple-500/30'
						}`}>
							<div className="w-full h-full rounded-full bg-gradient-to-r from-white/30 to-transparent animate-pulse"></div>
						</div>
					</div>
					
					{/* Floating sparkles */}
					<div className="absolute inset-0 w-24 h-24">
						{Array.from({ length: 4 }, (_, i) => (
							<div
								key={i}
								className="absolute w-1 h-1 bg-yellow-400 rounded-full animate-ping"
								style={{
									top: `${20 + Math.sin(Date.now() / 1000 + i) * 30}%`,
									left: `${20 + Math.cos(Date.now() / 1000 + i) * 30}%`,
									animationDelay: `${i * 0.5}s`,
									animationDuration: '2s'
								}}
							/>
						))}
					</div>
				</div>

				{/* Animated text content */}
				<div className="flex flex-col gap-y-3 text-center">
					<h6 className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent animate-pulse">
						{title}
					</h6>
					<p className="text-gray-600 leading-relaxed animate-fade-in-up">
						{description}
					</p>
					
					{/* Animated dots */}
					<div className="flex justify-center gap-1 mt-2">
						{Array.from({ length: 3 }, (_, i) => (
							<div
								key={i}
								className="w-2 h-2 bg-blue-400 rounded-full animate-bounce"
								style={{ animationDelay: `${i * 0.2}s` }}
							/>
						))}
					</div>
				</div>

				{/* Progress wave */}
				<div className="w-full h-1 bg-gray-200 rounded-full overflow-hidden">
					<div className="h-full bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 rounded-full animate-pulse transform origin-left">
						<div className="h-full bg-gradient-to-r from-transparent via-white/50 to-transparent animate-shimmer"></div>
					</div>
				</div>

				{/* Floating elements */}
				<div className="absolute -top-4 -right-4 w-8 h-8 bg-gradient-to-r from-pink-400 to-purple-500 rounded-full opacity-60 animate-bounce delay-300"></div>
				<div className="absolute -bottom-4 -left-4 w-6 h-6 bg-gradient-to-r from-blue-400 to-cyan-400 rounded-full opacity-60 animate-bounce delay-700"></div>
			</div>

			<style jsx>{`
				@keyframes shimmer {
					0% { transform: translateX(-100%); }
					100% { transform: translateX(100%); }
				}
				
				@keyframes fade-in-up {
					from {
						opacity: 0;
						transform: translateY(10px);
					}
					to {
						opacity: 1;
						transform: translateY(0);
					}
				}
				
				.animate-shimmer {
					animation: shimmer 2s infinite;
				}
				
				.animate-fade-in-up {
					animation: fade-in-up 1s ease-out;
				}
			`}</style>
		</div>
	);
};

// Demo component to show the loading state
export default function LoadingDemo() {
	return (
		<LoadingState 
			title="Creating Magic..."
			description="We're crafting something amazing for you. This won't take long!"
		/>
	);
} 