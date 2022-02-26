import { writable, type Writable } from 'svelte/store';
import type { Poll } from '../../../../Habile/src/core/classes/Poll';

export const currentPoll: Writable<Poll> = writable();
