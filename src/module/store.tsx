import { configureStore } from "@reduxjs/toolkit";
import Authentication from "./features/authentication";
import completeProfileSlice from "./features/completeProfile";
import coursesSlice from "./features/courses";
import competencySlice from "./features/competency";
import assessmentSlice from "./features/assesments";
import getUsersSlice from "./features/users";
import getWishlistSlice from "./features/wishlist";
import occupationalTodo from "./features/occupational";
import professorSlice from "./features/professor";
import universitySlice from "./features/university";
import ratingSlice from "./features/ratings";
import outcomesSlice from "./features/outcomesSlice";
import professorCourseSlice from "./features/professorCourse";
import ConcentrationSlice from "./features/concentration";
import DegreeSlice from "./features/degree";
import { TypedUseSelectorHook, useDispatch, useSelector } from "react-redux";
import DepartmentSlice from "./features/department";
export const store = configureStore({
  reducer: {
    Authentication: Authentication,
    completeProfileSlice: completeProfileSlice,
    coursesSlice: coursesSlice,
    competencySlice: competencySlice,
    ConcentrationSlice: ConcentrationSlice,
    degreeSlice: DegreeSlice,
    departmentSlice: DepartmentSlice,
    assessmentSlice: assessmentSlice,
    getUsersSlice: getUsersSlice,
    getWishlistSlice: getWishlistSlice,
    occupationalTodo: occupationalTodo,
    professorSlice: professorSlice,
    universitySlice: universitySlice,
    ratingSlice: ratingSlice,
    outcomesSlice: outcomesSlice,
    professorCourseSlice: professorCourseSlice,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
});

// Create typed hooks for use in components
export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;

export const useAppDispatch: () => AppDispatch = useDispatch;
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
