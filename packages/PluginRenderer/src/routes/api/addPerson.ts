// import { people } from '$lib/stores/people';
// import type { RequestHandler } from '@sveltejs/kit';

// const rng = [
// 	{ x: 272, y: 218, s: 148 },
// 	{ x: 107, y: 698, s: 102 },
// 	{ x: 420, y: 925, s: 78 },
// 	{ x: 693, y: 914, s: 142 },
// 	{ x: 242, y: 562, s: 60 },
// 	{ x: 63, y: 385, s: 110 },
// 	{ x: 627, y: 137, s: 80 },
// 	{ x: 1025, y: 177, s: 130 },
// 	{ x: 1341, y: 74, s: 118 },
// 	{ x: 1623, y: 301, s: 54 },
// 	{ x: 1626, y: 510, s: 102 },
// 	{ x: 1431, y: 765, s: 132 },
// 	{ x: 1692, y: 897, s: 88 },
// 	{ x: 1117, y: 857, s: 136 },
// 	{ x: 173, y: 81, s: 72 },
// 	{ x: 190, y: 831, s: 156 },
// 	{ x: 1692, y: 97, s: 72 },
// 	{ x: 1736, y: 687, s: 124 },
// ].sort(() => Math.random() - 0.5);

// export const post: RequestHandler = async ({ request }) => {
// 	const res = await request.json();
// 	console.log(res);

// 	people.update((people) => {
// 		const { x, y, s } = rng.shift();
// 		return [...people, { ...res, x, y, s }];
// 	});

// 	return {
// 		status: 200,
// 		body: {
// 			...res,
// 			message: 'ok',
// 		},
// 	};
// };

// // export function rngBetween(min: number, max: number, exclude?: { from: number; to: number }) {
// // 	let rng = Math.floor(Math.random() * (max - min + 1)) + min;

// // 	if (exclude) {
// // 		if (exclude.from <= rng && rng <= exclude.to) {
// // 			rng = rngBetween(min, max, exclude);
// // 		}
// // 	}

// // 	return rng;
// // }
