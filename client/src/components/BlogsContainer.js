import { useAppContext } from '../context/appContext';
import { useEffect, useState } from 'react';
import Loading from './Loading';
import Alert from './Alert';
import Wrapper from '../assets/wrappers/JobsContainer';
import PageBtnContainer from './PageBtnContainer';
import Blog from './Blog';
import axios from 'axios';

const BlogsContainer = (props) => {
    const {
        getBlogs,
        // blogs,
        isLoading,
        page,
        // totalBlogs,
        search,
        searchStatus,
        searchType,
        sort,
        // numOfPages,
        showAlert,

    } = useAppContext();

    const [blogss, setBlogss] = useState([]);
    const [totalBlogss, setTotalBlogss] = useState(0);
    const [numOfPagess, setNumOfPagess] = useState(0);

    useEffect(() => {
        getBlogs(props.isBlogPage);
        getBlogsApi(props.isBlogPage);
        // eslint-disable-next-line
    }, [page, search, searchStatus, searchType, sort, props.isBlogPage]);



    async function getBlogsApi(isBlogPage) {
        // const { search } = state;
        let url = '';
        if (isBlogPage) {
            // url = `/landing-blog?page=${page}&status=${searchStatus}&blogType=${searchType}&sort=${sort}&isLanding=${isBlogPage}`;
            url = `/landing-blog?isLanding=${isBlogPage}`;

        }
        else {
            // url = `/blog?page=${page}&status=${searchStatus}&blogType=${searchType}&sort=${sort}&isLanding=${isBlogPage}`;
            url = `/blog?isLanding=${isBlogPage}`;

        }
        // if (search) {
        //     url = url + `&search=${search}`;
        // }
        // dispatch({ type: GET_BLOGS_BEGIN });
        try {
            const authFetch = axios.create({
                baseURL: 'api/v1',
            });
            // Response interceptor
            authFetch.interceptors.response.use(
                (response) => {
                    return response;
                },
                (error) => {
                    console.log(error.response);
                    if (error.response.status === 401) {
                        // logoutUser()
                    }
                    return Promise.reject(error);
                }
            );

            const { data } = await authFetch.get(url);
            const { blogs, totalBlogs, numOfPages } = data;

            setBlogss(blogs);
            setTotalBlogss(totalBlogs);
            setNumOfPagess(numOfPages);
            // dispatch({
            //     type: GET_BLOGS_SUCCESS,
            //     payload: {
            //         blogs,
            //         totalBlogs,
            //         numOfPages,
            //     },
            // });
        } catch (error) {
            console.log(error.message);
            // logoutUser();
        }
    }




    // useEffect(() => {
    //     getBlogs(props.isBlogPage);

    //     return () => {
    //         const blogResponse = getBlogs(props.isBlogPage);
    //         console.log('HENNING', blogResponse);
    //     }
    //     // eslint-disable-next-line
    // }, [props.isBlogPage])


    // useEffect(() => {
    //     async function getApiBlog(flag) {
    //         const blogResponse = await getBlogs(flag);
    //         console.log('HENNING', blogResponse);
    //         return blogResponse
    //     }
    //     getApiBlog(props.isBlogPage);
    // }, [props.isBlogPage])


    if (isLoading) {
        return <Loading center />;
    }

    if (!blogss || blogss.length === 0) {
        return (
            <Wrapper>
                <h2>No blogs to display...</h2>
            </Wrapper>
        );
    }

    return (
        <Wrapper>
            {showAlert && <Alert />}
            <h5>
                {/* {totalBlogs} blog{blogs.length > 1 && 's'} found */}

                {totalBlogss} blog{blogss.length > 1 && 's'} found

            </h5>
            <div className='jobs'>
                {blogss.map((blog) => {
                    return <Blog key={blog._id} {...blog} isBlogPage={props.isBlogPage} />;
                })}
            </div>
            {numOfPagess > 1 && <PageBtnContainer />}
        </Wrapper>
    );
};

export default BlogsContainer;