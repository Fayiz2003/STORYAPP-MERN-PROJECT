import commonAPI from "./commonAPI"
import serverUrl from "./serverUrl"

// register 
export const registerAPI = async (reqBody)=>{
 return await commonAPI("POST",`${serverUrl}/register`,reqBody)
}

// login 
export const loginAPI = async (reqBody)=>{
    return await commonAPI("POST",`${serverUrl}/login`,reqBody)
   }

//    addStory API called by add
export const addStoryAPI = async(reqBody,reqHeader)=>{
    return await commonAPI("POST",`${serverUrl}/add-story`,reqBody,reqHeader)
}

// homeStoriesAPI called by Home
export const homeStoriesAPI = async ()=>{
    return await commonAPI("GET",`${serverUrl}/home-stories`,"")
}

// AllProjectsAPI called by Story
export const allStoriesAPI = async (searchKey,reqHeader)=>{
    return await commonAPI("GET",`${serverUrl}/all-stories?search=${searchKey}`,"",reqHeader)
}

// adminStoryAPI called by dashborad -----
export const adminStoryAPI = async (reqHeader)=>{
    return await commonAPI("GET",`${serverUrl}/admin-stories`,"",reqHeader)
}

// deleteStoryAPI called by view
export const deleteStoryAPI = async (sid,reqHeader)=>{
    return await commonAPI("DELETE",`${serverUrl}/${sid}/remove-story`,{},reqHeader)
}

// editStoryctAPI called by Edit : put request http://localhost:3000/sid/edit-story  
export const editStoryAPI = async (sid,reqBody,reqHeader)=>{
    return await commonAPI("PUT",`${serverUrl}/${sid}/edit-story`,reqBody,reqHeader)
}

// editUserAPI called by Profile : put request http://localhost:3000/user/edit
export const editUserAPI = async (reqBody,reqHeader)=>{
    return await commonAPI("PUT",`${serverUrl}/user/edit`,reqBody,reqHeader)
}

// viewStoryAPI called by  : put request http://localhost:3000/stories/${sid}view
export const viewStoryAPI = async (sid,reqHeader)=>{
    return await commonAPI("GET",`${serverUrl}/stories/${sid}/view`,"",reqHeader)
}

//add to favourites
export const addToFavouriteAPI = async(reqBody,reqHeader)=>{
    return await commonAPI("POST",`${serverUrl}/story/save`,reqBody,reqHeader)
}

//get Favourite stories
export const getFavouriteAPI = async(reqHeader)=>{
    return await commonAPI("GET",`${serverUrl}/all-saved-stories`,"",reqHeader)
}
//delete Favourite stories
export const deleteFavouriteAPI = async (id,reqHeader)=>{
    return await commonAPI("DELETE",`${serverUrl}/saved-story/${id}/remove`,{},reqHeader)
}

//get single user details caaled by header
export const getSingleUserAPI = async(reqHeader)=>{
    return await commonAPI("GET",`${serverUrl}/single-user`,"",reqHeader)
}

// All users called by project
export const getAllUsersAPI = async (reqHeader)=>{
    return await commonAPI("GET",`${serverUrl}/all-users`,"",reqHeader)
}
// deleteUserAPI called by view
export const deleteUserAPI = async (id,reqHeader)=>{
    return await commonAPI("DELETE",`${serverUrl}/${id}/remove-user`,{},reqHeader)
}

// get user details by email
export const getUserByEmailAPI = async ()=>{
    return await commonAPI("GET",`${serverUrl}/user-email`,"")
}
// Reset password
export const updatePasswordAPI = async (data) => {
    const response = await fetch(`${serverUrl}/reset-password`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });
    return response.json();
  };
  