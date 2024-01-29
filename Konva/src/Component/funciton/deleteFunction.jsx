import React, { useState, useRef, useEffect, useCallback } from "react";
import { Stage, Layer, Transformer, Line, Image } from "react-konva";

const deleteFunction = (
  shapes,
  selectedId,
  setShapes,
  setSelectedId,
  lines,
  setLines,
  setDrawingList,
  texts,
  setTexts,
  images,
  setImages
) => {
  const deleteSelectedShape = () => {
    const newShapes = shapes.filter((shape) => shape.id !== selectedId);
    setShapes(newShapes);
    setSelectedId(null); // 선택 해제
  };

  const deleteSelectedLine = () => {
    const newLines = lines.filter((line) => line.id !== selectedId);
    setLines(newLines);
    setSelectedId(null); // 선택 해제
  };

  const deleteSelectedDrawing = () => {
    setDrawingList([]);
    console.log("삭제 완료");
  };

  const deleteSelectedText = () => {
    const newTexts = texts.filter((text) => text.id !== selectedId);
    setTexts(newTexts);
    setSelectedId(null);
  };

  const deleteSelectedImage = () => {
    if (selectedId) {
      // 이미지 ID 파싱 부분은 생략하고, selectedId를 직접 사용합니다.
      // 필요에 따라 여기서 ID 파싱 로직을 추가할 수 있습니다.
  
      // 해당 ID를 가진 이미지를 제외하고 새로운 이미지 배열을 생성합니다.
      const newImages = images.filter((image) => `image-${image.id}` !== selectedId);
  
      setImages(newImages); // 새로운 이미지 배열로 상태를 업데이트합니다.
      setSelectedId(null); // 선택된 이미지 ID를 초기화합니다.
    }
  };

//     const deleteSelectedImage = () => {
//     if (selectedId) {
//       const imageId = parseInt(selectedId.split("-")[1]);

//       // 해당 ID를 가진 이미지를 제외한 새로운 배열 생성
//       const newImages = images.filter((image) => image.id !== imageId);

//       setImages(newImages);
//       setSelectedId(null); // 이미지 삭제 후 선택된 이미지 ID 초기화
//       console.log(shapes);
//     }
//   };

    // const deleteSelectedImg = () => {
  //   const newImages = images.filter((image) => image.id !== selectedId);
  //   setImages(newImages);
  //   setSelectedId(null);
  // };

  return {
    deleteSelectedDrawing,
    deleteSelectedImage,
    deleteSelectedLine,
    deleteSelectedShape,
    deleteSelectedText,
  };
};

export default deleteFunction;