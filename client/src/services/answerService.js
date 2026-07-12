import api from "./api";

export const addAnswer = async (questionId, answer) => {
    const token = localStorage.getItem("token");

    const response = await api.post(
        `/answers/${questionId}`,
        { answer },
        {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        }
    );

    return response.data;
};