import { Ref } from 'vue';
/**
 * Keyboard handling shared by every @vuepic/vue-datepicker in the app.
 *
 * Out of the box the picker opens its calendar without moving focus into it, so
 * a keyboard user is left on the input with a calendar they cannot reach, and
 * its arrow-key navigation walks onto dates with no data. This wires up the
 * four things that fix that, so the pickers in the map view and in the date
 * range creator behave the same way.
 *
 * Use it with `:arrow-navigation="true"` and `:teleport="true"` on the picker,
 * and a Cancel button in the #action-buttons slot if that slot is overridden -
 * overriding it drops the picker's own Cancel, which otherwise leaves Escape as
 * the only way out with nothing on screen to say so.
 */
interface DatePickerInstance {
    closeMenu: () => void;
}
export declare function createCalendarPickerKeyboardHandlers(calendar: Ref<DatePickerInstance | null>): {
    onOpen: () => void;
    onMonthChange: () => void;
    onClosed: () => void;
    closeAfterSelection: () => void;
};
export {};
