import  "./Profile.css";

import { upload } from "../../utils/config";

// Components
import Message from "../../components/Message";
import { Link } from "react-router-dom";
import { BsFillEyeFill, BsPencilFill, BsXLg } from "react-icons/bs";


// hooks
import { useState, useEffect, useRef } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useParams } from "react-router-dom";

// redux
import { getUserDetails } from './../../slices/userSlice';

const Profile = () => {

    const { id } = useParams()

    const dispatch = useDispatch()

    const {user, loading} = useSelector((state) => state.user)
    const {user: userAuth} = useSelector((state) => state.auth)

    // photo


    // loading user data
    useEffect(() => {

        dispatch(getUserDetails(id))

    }, [dispatch, id])

    if (loading) {
        return <p>Carregando...</p>
    }
    

    return (
        <div id="profile">
            <div className="profile-header">
                {user.profileImage && (
                    <img src={`${upload}/users/${user.profileImage}`} alt={user.name} />
                )}
                <div class="profile-description">
                    <h2>{user.name}</h2>
                    <p>{user.bio}</p>
                </div>
            </div>
        </div>
    )
}

export default Profile