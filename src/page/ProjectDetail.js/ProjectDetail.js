/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useParams } from 'react-router-dom'
import { getProjectDetailAction } from '../../redux/actions/QuanLyDuAnAction'
import ContentDetail from './ContentDetail/ContentDetail'
import HeaderDetail from './Header/HeaderDetail'
import InfoDetail from './InfoDetail/InfoDetail'

export default function ProjectDetail(props) {
    const {projectDetail} = useSelector(state => state.QuanLyDuAnReducer)
    const {id} = useParams();
    console.log("id", id)
    console.log("projectDetail", projectDetail)
    const dispatch = useDispatch();
    useEffect(() => {
        dispatch(getProjectDetailAction(id))
    },[])
  return (
    <div className="project-detail">
        <HeaderDetail projectDetail={projectDetail}/>
        <InfoDetail projectDetail={projectDetail}/>
        <ContentDetail projectDetail={projectDetail}/>
    </div>
  )
}
