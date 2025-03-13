import { ContentFormPostHook } from '@/modules/core/@types/post';
import { create } from 'zustand';




export const usePostStore = create<ContentFormPostHook>()((set) => ({
    type: 'PT',
    categories: [],
    modifier: {
        style: {},
        isModifyBackground: false,
        styleParagraph: {}
    },
    value: {
        html: '',
        file: null
    },
    updateModifierBg: (payload) => set((state) => ({
        modifier: {
            style: { ...state.modifier.style },
            styleParagraph: { ...state.modifier.styleParagraph },
            isModifyBackground: payload
        }
    })),
    updateModifierStilePrg: (payload) => set((state) => ({
        modifier: {
            style: { ...state.modifier.style },
            styleParagraph: payload,
            isModifyBackground: state.modifier.isModifyBackground
        }
    })),
    updateModifierStyle: (payload) => set((state) => ({
        modifier: {
            style: payload,
            styleParagraph: { ...state.modifier.styleParagraph },
            isModifyBackground: state.modifier.isModifyBackground
        }
    })),

    updateType: (payload) => set(() => ({
        type: payload
    })),

    updateValueHtm: (payload) => set((state) => ({
        value: {
            ...state.value,
            html: payload
        }
    })),

    updateValueFile: (payload) => set((state) => ({
        value: {
            ...state.value,
            file: payload
        }
    })),

    updateCategories: (values: string[]) => set(() => ({
        categories: values,
    })),

    reset: () => set(() => ({
        type: 'PT',
        modifier: {
            style: {},
            isModifyBackground: false,
            styleParagraph: {}
        },
        categories: [],
        value: {
            html: '',
            file: null
        },
    })),
}
));
