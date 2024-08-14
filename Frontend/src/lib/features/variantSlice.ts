import axiosInstance from '@/utilis/axios'
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'

interface variantInterface{
    variants:[] | null,
    variantID:string|null,
    isCreateVariantSuccess:boolean
    isCreateVariantPending:boolean
    isCreateVariantError:boolean
    isGetVariantSuccess:boolean
    isGetVariantPending:boolean
    isGetVariantError:boolean
    isDeleteVariantSuccess:boolean
    isDeleteVariantPending:boolean
    isDeleteVariantError:boolean
    isUpdateVariantSuccess:boolean
    isUpdateVariantPending:boolean
    isUpdateVariantError:boolean
}

const initialState:variantInterface = {
    variants:null,
    variantID:null,
    isGetVariantSuccess:false,
    isGetVariantPending:false,
    isGetVariantError:false,
    isCreateVariantSuccess:false,
    isCreateVariantPending:false,
    isCreateVariantError:false,
    isDeleteVariantSuccess:false,
    isDeleteVariantPending:false,
    isDeleteVariantError:false,
    isUpdateVariantSuccess:false,
    isUpdateVariantPending:false,
    isUpdateVariantError:false,
}

export const getAllVariants = createAsyncThunk('getAllVariants',async()=>{
    const response = await axiosInstance.get('/variant')
    return response.data.data
})

export const addVariant = createAsyncThunk('addVariant',async data =>{
    const token = JSON.parse(localStorage.getItem('userToken'))
    const response = await axiosInstance.post('/variant/create-variant',data,{
        headers: {
            authorization: `Bearer ${token.accessToken}`
        }
    })
    return response.data.data
})

export const deleteVariant = createAsyncThunk('deleteVariant',async id =>{
    const token = JSON.parse(localStorage.getItem('userToken'))
    const response = await axiosInstance.delete(`/variant/delete-variant/${id}`,{
        headers: {
            authorization: `Bearer ${token.accessToken}`
        }
    })
    return id
})

export const updateVariant = createAsyncThunk('updateVariant',async({id,data})=>{
    const token = JSON.parse(localStorage.getItem('userToken'))
    const response = await axiosInstance.put(`/variant/update-variant/${id}`,data,{
        headers: {
            authorization: `Bearer ${token.accessToken}`
        }
    })
    return response
})

export const variantSlice = createSlice({
    name:'variant',
    initialState,
    reducers:{
        reset:state=>{
            state.isGetVariantSuccess=false;
            state.isGetVariantPending=false;
            state.isGetVariantError=false;
            state.isCreateVariantSuccess=false;
            state.isCreateVariantPending=false;
            state.isCreateVariantError=false;
            state.isDeleteVariantSuccess=false;
            state.isDeleteVariantPending=false;
            state.isDeleteVariantError=false;
            state.isUpdateVariantSuccess=false;
            state.isUpdateVariantPending=false;
            state.isUpdateVariantError=false;
        },
        setVariantID:(state,action)=>{
            state.variantID=action.payload;
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
        .addCase(addVariant.pending,(state,action)=>{
            state.isCreateVariantSuccess=false;
            state.isCreateVariantPending=true;
            state.isCreateVariantError=false;
        })
        .addCase(addVariant.fulfilled,(state,action)=>{
            state.isCreateVariantSuccess=true;
            state.isCreateVariantPending=false;
            state.isCreateVariantError=false;
            state.variants?.push(action.payload)
        })
        .addCase(addVariant.rejected,(state,action)=>{
            state.isCreateVariantSuccess=false;
            state.isCreateVariantPending=false;
            state.isCreateVariantError=false;
        })
        .addCase(deleteVariant.pending,(state,action)=>{
            state.isDeleteVariantSuccess=false;
            state.isDeleteVariantPending=true;
            state.isDeleteVariantError=false;
        })
        .addCase(deleteVariant.fulfilled,(state,action)=>{
            state.isDeleteVariantSuccess=true;
            state.isDeleteVariantPending=false;
            state.isDeleteVariantError=false;
            const result: never[] |undefined = state?.variants?.filter(
                item => item._id !== action.payload
              )
              state.variants = result
        })
        .addCase(deleteVariant.rejected,(state,action)=>{
            state.isDeleteVariantSuccess=false;
            state.isDeleteVariantPending=false;
            state.isDeleteVariantError=true;
        })
        .addCase(updateVariant.pending,(state,action)=>{
            state.isUpdateVariantSuccess=false;
            state.isUpdateVariantPending=true;
            state.isUpdateVariantError=false;
        })
        .addCase(updateVariant.fulfilled,(state,action)=>{
            state.isUpdateVariantSuccess=true;
            state.isUpdateVariantPending=false;
            state.isUpdateVariantError=false;
        })
        .addCase(updateVariant.rejected,(state,action)=>{
            state.isUpdateVariantSuccess=false;
            state.isUpdateVariantPending=false;
            state.isUpdateVariantError=true;
        })
    }
})


export const {reset,setVariantID} = variantSlice.actions
export default variantSlice.reducer