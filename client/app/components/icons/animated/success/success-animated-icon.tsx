import Lottie from 'lottie-react';
import SuccessAnimationData from './success-animated-icon.json';
import type { LottieProps } from '../lottie';

/***
 * @param {boolean} [loop=false]
 */
export default function SuccessAnimatedIcon({ className, loop }: LottieProps) {
	return <Lottie animationData={SuccessAnimationData} loop={!!loop} className={className} />
}