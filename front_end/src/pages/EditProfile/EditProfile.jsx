import "./EditProfile.css";

import { upload } from "../../utils/config";

// Hooks
import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";

// Redux
import { profile, resetMessage, updateProfile } from "../../slices/userSlice";

// Components
import Message from "../../components/Message";

const EditProfile = () => {

    const dispatch = useDispatch()

    const {user, message, error, loading} = useSelector((state) => state.user)

    const [name, setName] = useState("")
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [profileImage, setProfileImage] = useState("")
    const [bio, setBio] = useState("")
    const [previewImage, setPreviewImage] = useState("")


    // Load user data
    useEffect(() => {
        dispatch(profile())
    }, [dispatch])

    useEffect(() => {

        if (user){
            setName(user.name)
            setEmail(user.email)
            setBio(user.bio)
        }

    }, [user])
    
    
    console.log(user)

    const handleSubmit = async (e) => {
        e.preventDefault()

        const userData = {
            name,
            profileImage,
            bio,
            password
        }

        const formData = new FormData()

        Object.keys(userData).forEach((key) => {
            if (userData[key]) {
            formData.append(key, userData[key])
            }
        })

        await dispatch(updateProfile(formData))

        setTimeout(() => {
            dispatch(resetMessage())
        }, 2000)
    }

    const handleFile = (e) => {
        // image preview
        const image = e.target.files[0]

        setPreviewImage(image)

        setProfileImage(image)
    }

    return (
        <div id="edit-profile">
            <h2>Edite seus dados</h2>
            <p className='subtitle'>Adicione uma imagem de perfil e conte mais sobre você...</p>
            {(user.profileImage || previewImage) && (
                <img
                    className='profile-image'
                    alt=""
                    src={
                        previewImage ? URL.createObjectURL(previewImage) : `${upload}/user/${user.profileImage}`
                    } 
                />
            )}
            <form onSubmit={handleSubmit}>
                <input type="text" placeholder='Nome' onChange={(e) => setName(e.target.value)} value={name || ""} />
                <input type="email" placeholder='E-mail' value={email || ""} disabled />
                <label>
                    <span>Imagem do Perfil:</span>
                    <input type="file" onChange={handleFile} />
                </label>
                <label>
                    <span>Bio:</span>
                    <input type="text" placeholder='Descrição do perfil' onChange={(e) => setBio(e.target.value)} value={bio || ""} />
                </label>
                <label>
                    <span>Quer alterar sua senha?</span>
                    <input type="password" placeholder='Digite sua nova senha' onChange={(e) => setPassword(e.target.value)} value={password || ""} />
                </label>
                {!loading && <input type="submit" value='Atualizar' />}
                {loading && <input type="submit" value='Aguarde...' disabled />}
                {error && <Message msg={error} type="error" />}
                {message && <Message msg={message} type="success" />}
            </form>
        </div>
    )
}

export default EditProfile