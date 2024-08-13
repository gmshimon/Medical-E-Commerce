import axiosInstance from '@/utilis/axios'
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'

interface variantInterface{
    variants:[] | null,
    isGetVariantSuccess:boolean
    isGetVariantPending:boolean
    isGetVariantError:boolean
}

const initialState:variantInterface = {
    variants:null,
    isGetVariantSuccess:false,
    isGetVariantPending:false,
    isGetVariantError:false
}

export const getAllVariants = createAsyncThunk('getAllVariants',async()=>{
    const response = await axiosInstance.get('/variant')
    return response.data.data
})

export const variantSlice = createSlice({
    name:'variant',
    initialState,
    reducers:{
        reset:state=>{
            state.isGetVariantSuccess=false;
            state.isGetVariantPending=false;
            state.isGetVariantError=false;
        }
    },
    extraReducers:builder=>{
        builder
        .addCase(getAllVariants.pending,(state,action)=>{
            state.isGetVariantSuccess=false;
            state.isGetVariantPending=true;
            state.isGetVariantError=false;
        })
        .addCase(getAllVariants.fulfilled,(state,action)=>{
            state.isGetVariantSuccess=true;
            state.isGetVariantPending=false;
            state.isGetVariantError=false;
            state.variants=action.payload;
        })
        .addCase(getAllVariants.rejected,(state,action)=>{
            state.isGetVariantSuccess=false;
            state.isGetVariantPending=false;
            state.isGetVariantError=true;
        })
    }
})


export const {reset} = variantSlice.actions
export default variantSlice.reducer