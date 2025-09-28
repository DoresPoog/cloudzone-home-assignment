import Lottie from 'lottie-react';
import ErrorAnimationData from './error-animated-icon.json';
import type { LottieProps } from '../lottie';

/***
 * @param {boolean} [loop=false]
 */
export default function ErrorAnimatedIcon({ className, loop }: LottieProps) {
	return <Lottie animationData={ErrorAnimationData} loop={!!loop} className={className} />
}