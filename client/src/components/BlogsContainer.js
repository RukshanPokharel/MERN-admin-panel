import { useAppContext } from '../context/appContext';
import { useEffect } from 'react';
import Loading from './Loading';
import Alert from './Alert';
import Wrapper from '../assets/wrappers/JobsContainer';
import PageBtnContainer from './PageBtnContainer';
import Blog from './Blog';

const BlogsContainer = (props) => {
    const {
        getBlogs,
        blogs,
        isLoading,
        page,
        totalBlogs,
        search,
        searchStatus,
        searchType,
        sort,
        numOfPages,
        showAlert,
    } = useAppContext();

    // useEffect(() => {
    //     async function getApiBlog(flag) {
    //         const blogResponse = await getBlogs(flag);
    //         console.log('HENNING', blogResponse);
    //         return blogResponse
    //     }
    //     getApiBlog(props.isBlogPage);
    // }, [props.isBlogPage])

    useEffect(() => {
        getBlogs(props.isBlogPage);

        return () => {
            const blogResponse = getBlogs(props.isBlogPage);
            console.log('HENNING', blogResponse);
        }

    }, [props.isBlogPage])


    if (isLoading) {
        return <Loading center />;
    }

    if (!blogs || blogs.length === 0) {
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

                {totalBlogs} blog{blogs.length > 1 && 's'} found

            </h5>
            <div className='jobs'>
                {blogs.map((blog) => {
                    return <Blog key={blog._id} {...blog} isBlogPage={props.isBlogPage} />;
                })}
            </div>
            {numOfPages > 1 && <PageBtnContainer />}
        </Wrapper>
    );
};

export default BlogsContainer;