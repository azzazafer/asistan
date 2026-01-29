import { createMachine } from 'xstate';

/**
 * Aura Sales Funnel State Machine
 * Defines the strict journey from a Cold Lead to a Paid Patient.
 */
export const funnelMachine = createMachine({
    id: 'auraSalesFunnel',
    initial: 'qualifying',
    states: {
        qualifying: {
            on: {
                QUALIFIED: 'objection_handling',
                NOT_INTERESTED: 'closed_lost',
                REJECTED_BY_AI: 'closed_lost'
            }
        },
        objection_handling: {
            on: {
                OBJECTION_CLEARED: 'closing',
                ADDITIONAL_INFO_NEEDED: 'objection_handling',
                REFUSED: 'closed_lost'
            }
        },
        closing: {
            on: {
                INTENT_CONFIRMED: 'payment_pending',
                WAVERING: 'objection_handling'
            }
        },
        payment_pending: {
            on: {
                PAYMENT_SUCCESS: 'converted',
                PAYMENT_FAILED: 'closing'
            }
        },
        converted: {
            type: 'final'
        },
        closed_lost: {
            type: 'final'
        }
    }
});
