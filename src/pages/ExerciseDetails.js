import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Box } from "@mui/material";

import Details from "../components/Details";
import ExercisesVideos from "../components/ExercisesVideos";
import SimilarExercises from "../components/SimilarExercises";

import { exerciseOption, fetchData, youtubeOptions } from "../utils/fetchData";

// URL
const baseURLExercise = "https://exercisedb.p.rapidapi.com";
const baseURLYoutube = "https://youtube-search-and-download.p.rapidapi.com";

const ExerciseDetails = () => {
  const [exerciseDetail, setExerciseDetail] = useState({});
  const [exerciseVideos, setExerciseVideos] = useState([]);
  const [targetMuscleExercises, setTargetMuscleExercises] = useState([]);
  const [equipmentExercises, setEquipmentExercises] = useState([]);

  const { id } = useParams();

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });

    const fetchExercisesData = async () => {
      const exerciseDetailsData = await fetchData(
        `${baseURLExercise}/exercises/exercise/${id}`,
        exerciseOption
      );
      setExerciseDetail(exerciseDetailsData);

      const exerciseVideosData = await fetchData(
        `${baseURLYoutube}/search?query=${exerciseDetailsData.name} exercise`,
        youtubeOptions
      );
      setExerciseVideos(exerciseVideosData.contents);

      const targetMuscleExercisesData = await fetchData(
        `${baseURLExercise}/exercises/target/${exerciseDetailsData.target}`,
        exerciseOption
      );
      setTargetMuscleExercises(targetMuscleExercisesData);

      const equipmentExercisesData = await fetchData(
        `${baseURLExercise}/exercises/equipment/${exerciseDetailsData.equipment}`,
        exerciseOption
      );
      setEquipmentExercises(equipmentExercisesData);
    };
    fetchExercisesData();
  }, [id, exerciseDetail.name]);

  return (
    <Box sx={{ mt: { lg: "96px", xs: "60px" } }}>
      <Details exerciseDetail={exerciseDetail} />
      <ExercisesVideos
        exerciseVideos={exerciseVideos}
        name={exerciseDetail.name}
      />
      <SimilarExercises
        targetMuscleExercises={targetMuscleExercises}
        equipmentExercises={equipmentExercises}
      />
    </Box>
  );
};

export default ExerciseDetails;
