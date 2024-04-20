/* eslint-disable no-unused-vars */
import {React,useEffect,useRef, useState} from 'react'
import { useDispatch, useSelector } from 'react-redux'
import {updateUserSuccess,updateUserFailure,updateUserStart} from '../redux/userSlice/userSlice';
import { app } from '../firebase';
import {getDownloadURL, getStorage, ref, uploadBytesResumable}  from 'firebase/storage';

export default function Profile() {
  const fileRef = useRef(null);
 const {currentUser} =useSelector((state)=>state.user);
   const dispatch=useDispatch();
  const [file,setFile]=useState(undefined);
  const [filePerc,setFilePerc]=useState(null);
  const [fileUploadError,setFileUploadError]=useState(false);
  let [formData, setFormData] = useState({});
  const username = useRef(currentUser.user.username);
  const email=useRef(currentUser.user.email);
  const password=useRef(currentUser.user.password);


  const handleForm =async(e)=>{
     e.preventDefault();
     setFormData({...formData,username:username.current.value,password:password.current.value,email:email.current.value});
     console.log(formData);
     const url=`http://localhost:3000/api/user/update/${currentUser.user._id}`;

     console.log(url);
       
     try {
      dispatch(updateUserStart());
      
      const res=await fetch(url,{
      method:'POST',
      credentials: 'include',
      headers:{'Content-Type': 'application/json'},
      body:JSON.stringify(formData),
    }

    );
     const data =await res.json();
    console.log(data);
      // const response=await fetch('localhost:3000/')

     } catch (error) {
      dispatch(updateUserFailure(error.message));
      console.log(error);
     }
  }
  

 console.log("form",formData);
  useEffect(()=>{
    if(file){
      handleFileUpload(file);
    }
    console.log(formData);
    
  },[file]);


    const handleFileUpload=(file)=>{
    const storage=getStorage(app);
    const fileName=new Date().getTime()+file.name;
    const storageRef=ref(storage,fileName);
     const uploadTask=uploadBytesResumable(storageRef,file) ;
     
     uploadTask.on('state_changed', 
     (snapshot)=>{
      const progress=(snapshot.bytesTransferred/
      snapshot.totalBytes)*100;
      setFilePerc(Math.round(progress));},

      (error)=>{setFileUploadError(true)},
    ()=>{getDownloadURL(uploadTask.snapshot.ref).then(
      (downloadURL)=>{
        console.log(downloadURL);
        console.log(formData);
        setFormData({...formData,avatar:downloadURL})
      }
    )
    });
  };




  return (
    <div className='p-3 max-w-lg mx-auto'>
<h1 className='text-3xl font-semibold text-center my-7'>Profile</h1>
      <form  onSubmit={handleForm}  className='flex flex-col gap-4'>
        <input hidden type='file' ref={fileRef}  onChange={(e)=>setFile(e.target.files[0])} />
        <img  onClick={()=>fileRef.current.click()} alt='Profile' className='rounded-full' src={formData.avatar || currentUser.user.avatar} />
        <p className='self-center'>
          {fileUploadError?
          (<span className="text-red-800" >Error Image upload</span>):
          filePerc>0 && filePerc<100 ?
          (<span className='text-slate-700'>{`upload ${filePerc}`}</span>):
          filePerc===100?(
            <span className='text-green-700'> Image Sucessfully upload</span>
          ):("")          
          }
        </p>
        <input id="username"  ref={username} className='border p-3 rounded-lg' type='text' placeholder='username' />
        <input id="email"  ref={email}  className='border p-3 rounded-lg' type='text' placeholder='email' />
        <input id="password"  ref={password}  className='border p-3 rounded-lg' type='text' placeholder='password' />
        <button className=' h-10 uppercase hover:opacity-95   text-white rounded-lg bg-slate-700'>Update</button>
      </form>
      <div className='flex justify-between mt-5'>
        <span className='text-red-700 cursor-pointer font-bold'>Delete Account</span>
        <span className='text-red-700 cursor-pointer font-bold'>Sign-out</span>
      </div>
    </div>
  )
}
