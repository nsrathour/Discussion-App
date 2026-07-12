import api from "./api";

export const getAllQuestions = async () => {
    const response = await api.get("/questions");
    return response.data;
};

export const getQuestionById = async (id) => {
    const response = await api.get(`/questions/${id}`);
    return response.data;
};

export const createQuestion = async (questionData) => {
    const token = localStorage.getItem("token");

    const response = await api.post(
        "/questions",
        questionData,
        {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        }
    );

    return response.data;
};

export const getMyQuestions = async () => {
    const token = localStorage.getItem("token");

    const response = await api.get("/questions/my", {
        headers: {
            Authorization: `Bearer ${token}`,
        },
    });

    return response.data;
};

export const deleteQuestion = async (id) => {
    const token = localStorage.getItem("token");

    const response = await api.delete(
        `/questions/${id}`,
        {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        }
    );

    return response.data;
};

export const updateQuestion = async (id, questionData) => {
    const token = localStorage.getItem("token");

    const response = await api.put(
        `/questions/${id}`,
        questionData,
        {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        }
    );

    return response.data;
};

export const toggleUpvote = async (id) => {
    const token = localStorage.getItem("token");

    const response = await api.post(
        `/questions/${id}/upvote`,
        {},
        {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        }
    );

    return response.data;
};
export const searchQuestions = async (query) => {
    const response = await api.get(
        `/questions/search?query=${query}`
    );

    return response.data;
};