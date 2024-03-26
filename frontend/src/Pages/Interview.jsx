import React, { useEffect, useState } from 'react'
import SidebarComponent from '../Components/Sidebar'
import { Button, TextInput } from 'flowbite-react'
import DateTimePicker from '../Components/DatePicker'
import moment from 'moment';
import { CREATE_INTERVIEW, GET_INTERVIEW } from '../gqlOperatons/Interview/mutations';
import toast from 'react-hot-toast';
import { useMutation } from '@apollo/client';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { Loader } from './Loader';
import { setLoading } from '../app/user/userSlice';

function Interviews() {
  const { loggedIn, isLoading } = useSelector((state) => state.user);
  const [dateTime, setDateTime] = useState(new Date());
  const [Duration, setDuration] = useState(30);
  const [Topics, setTopics] = useState("");
  const [Error, setError] = useState(null);
  const [data, setdata] = useState(null);
  const [interviews, setInterviews] = useState(null);
  const [refresh, setRefresh] = useState(false);

  const navigate = useNavigate();
  const dispatch = useDispatch();





  const [createInterview] = useMutation(CREATE_INTERVIEW, {
    onError: (error) => {
      console.log("error in creating interview mutation ", error);
      setError(error.message);
    },
  });

  const [getInterviews] = useMutation(GET_INTERVIEW, {
    onError: (error) => {
      console.log("error in getting interviews ", error);
      setError(error.message);
    },
  });



  useEffect(() => {
    // console.log(loggedIn);
    getInterviews().then((data) => {
      console.log("Interviews data ", data);
      setInterviews(data.data.getInterview);
    })
      .catch((error) => {
        console.log("Error in getting interviews ", error);
        setError(error.message);

        // setError(error.message);
      });
    // setdata(null);

  }, [data]);


  const handleSubmit = (e) => {
    e.preventDefault();
    // console.log("interview Data ", dateTime.toISOString(), " ", Duration);
    dispatch(setLoading(true));
    createInterview({
      variables: {
        Interview: {
          startTime: dateTime.toISOString(),
          duration: Duration,
          topics: Topics?.split(','),
        }
      },
    }).then((res) => {
      console.log("Interview created ", res);
      if (res.errors) setError(res.errors ? res.errors.message : "Error in creating interview");
      else {

        setdata(res.data.createInterview);
      }
      dispatch(setLoading(false));

    }).catch((error) => {
      console.log("Error in creating interview ", error);
      setError(error.message);
      dispatch(setLoading(false));
    });

  };


  if (isLoading) return <Loader />;
  if (!isLoading && !loggedIn) {
    return navigate('/register');
  }
  // console.log("data ", data);
  if (Error) {
    toast.error(Error);
    // setTimeout(() => {
    setError(null);
    setdata(null);

    // }, 2000);
    // setRefresh(!refresh);
  }
  else if (data) {
    toast.success("Interview created successfully");
    // setTimeout(() => {
    setdata(null);
    setError(null);
    // }, 20000);
    // setRefresh(!refresh);
  }

  return (
    <div className=' w-screen h-screen border-spacing-0'>
      {/* <SidebarComponent></SidebarComponent> */}
      <div className='my-5'>
        <form onSubmit={handleSubmit}>
          <TextInput type='number' placeholder='Duration' value={Duration}
            required onChange={(e) => { setDuration(parseInt(e.target.value)) }}
          ></TextInput>
          <TextInput placeholder='Topics (format :cs fundamentals, os , ...)' value={Topics}
            onChange={(e) => { setTopics(e.target.value) }}
          ></TextInput>
          <DateTimePicker setDateTime={setDateTime} />
          <Button type='submit'>Create</Button>
        </form>
      </div>

      <div>
        <h1 className='text-5xl'>Your Interviews</h1>
        <div className='flex gap-5 flex-wrap'>
          {interviews?.map((interview) => {
            return (
              <div className='border-2 border-black p-3'>
                <h1>Interviewee : {interview.intervieweeName}</h1>
                <h1>Interviewer : {interview.interviewerName}</h1>
                <h1>Start Time : {moment(interview.startTime).format('MMMM Do YYYY, h:mm:ss a')}</h1>
                <h1>Duration : {interview.duration}</h1>
                <h1>Topics : {interview.topics?.join(', ')}</h1>
                <h1>Feedback : {interview.feedback ? "Given" : "Not Given"}</h1>
              </div>
            )
          })}
        </div>
      </div>
    </div>


  )
}

export default Interviews