import React, { useEffect, useState } from 'react'
//import "./Create.css"
import { useDispatch, useSelector } from 'react-redux'
import { getTeams,postDriver} from '../../Redux/Actions/actions';

const create = () =>{
    const dispatch =useDispatch()

    useEffect(()=>{
        dispatch(getTeams)
    },[])
}
const driversTeams=useSelector((state)=>state.driversTeams)

const [state,setState]=