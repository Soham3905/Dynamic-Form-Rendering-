import { createSlice } from '@reduxjs/toolkit';

const authSlice = createSlice({
  name: 'auth',
  initialState: {
    user: null,
    token: null,
    completeAddress: '', // Address from e-bill or user profile
    houseDetails: '', // House/flat number
    area: '', // Area/locality
    pincode: '', // Pincode
    city: '', // City name
    propertyDoc: '', // Property document flag
    isBillOnYourName: 'YES', // YES or NO
  },
  reducers: {
    setUser: (state, action) => {
      state.user = action.payload;
      state.token = action.payload.accessToken;
    },
    setCompleteAddress: (state, action) => {
      state.completeAddress = action.payload;
    },
    setHouseDetails: (state, action) => {
      state.houseDetails = action.payload;
    },
    setIsBillOnYourName: (state, action) => {
      state.isBillOnYourName = action.payload;
    },
    setArea: (state, action) => {
      state.area = action.payload;
    },
    setPincode: (state, action) => {
      state.pincode = action.payload;
    },
    setCity: (state, action) => {
      state.city = action.payload;
    },
    setPropertyDoc: (state, action) => {
      state.propertyDoc = action.payload;
    },
    logout: state => {
      state.user = null;
      state.token = null;
      state.completeAddress = '';
      state.houseDetails = '';
      state.area = '';
      state.pincode = '';
      state.city = '';
      state.propertyDoc = '';
      state.isBillOnYourName = 'YES';
    },
  },
});

export const { setUser, setCompleteAddress, setHouseDetails, setArea, setPincode, setCity, setPropertyDoc, setIsBillOnYourName, logout } = authSlice.actions;
export default authSlice.reducer;
