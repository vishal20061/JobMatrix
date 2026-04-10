import { useEffect } from 'react'
import axios from 'axios'
import { JOB_API_END_POINT } from '../utils/constant'
import { useDispatch, useSelector } from 'react-redux'
import { setAllAdminJobs } from '../redux/jobSlice'

const useGetAdminJobs = () => {
    const dispatch = useDispatch();
    const { user } = useSelector((store) => store.auth);
    useEffect(() => {
        const fetchAdminJobs = async () => {
            try {
                const res = await axios.get(`${JOB_API_END_POINT}/adminJobs`, { withCredentials: true });
                if (res.data.success) {
                    dispatch(setAllAdminJobs(res.data.jobs));
                }
            } catch (error) {
                console.log(error);
            }
        }
        fetchAdminJobs();
    }, [dispatch, user?._id])
}

export default useGetAdminJobs
