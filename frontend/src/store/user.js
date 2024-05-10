import { create } from 'zustand'
import { devtools } from 'zustand/middleware'

const useUserStore = create(devtools(set => ({
  user: null,
  loading: true,
  fetchUser: async () => {
    set({ loading: true });
    try {
      const response = await fetch('/data/user.json');
      const userData = await response.json();
      set({ user: userData, loading: false });
    } catch (error) {
      console.error('Failed to fetch user:', error);
      set({ loading: false });
    }
  }
})));

export default useUserStore;
