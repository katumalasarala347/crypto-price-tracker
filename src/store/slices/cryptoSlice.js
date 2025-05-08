import { createSlice } from '@reduxjs/toolkit';
import sampleData from '../../data/sampleCryptoData.json';

const cryptoSlice = createSlice({
  name: 'crypto',
  initialState: sampleData,
  reducers: {
    updateCrypto: (state, action) => {
      const { id, changes } = action.payload;
      const asset = state.find((item) => item.id === id);
      if (asset) Object.assign(asset, changes);
    },
  },
});

export const { updateCrypto } = cryptoSlice.actions;
export default cryptoSlice.reducer;
