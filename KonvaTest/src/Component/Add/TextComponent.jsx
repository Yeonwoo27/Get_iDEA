import React, { useState, useRef, useEffect } from "react";
import { Text, Transformer } from "react-konva";

const TextComponent = ({
  text,
  x,
  y,
  fontSize,
  onTextChange,
  onDragEnd,
  isSelected,
  textProps,
  onSelect,
  selectedId,
  setSelectedId,
  isEditing,
  setIsEditing,
  transformerRef,
}) => {
  const [textBox, setTextBox] = useState(text);
  const [position, setPosition] = useState({ x, y });
  // const transformerRef = useRef();
  const textRef = useRef();

  // const handleTextSelect = () => {
  //   setSelectedId(textProps.id);
  // }

  useEffect(() => {
    if (isSelected) {
      // 현재 도형에 Transformer 연결
      transformerRef.current.nodes([textRef.current]);
      transformerRef.current.getLayer().batchDraw();
    }
  }, [isSelected]);

  useEffect(() => {
    setTextBox(textRef.current);
  }, []);

  useEffect(() => {
    console.log(selectedId + " selected id 테스트용");
  }, [selectedId]);

  const handleDblClick = () => {
    if (!textBox) {
      console.error("TextBox가 아직 설정되지 않았습니다.");
      return;
    }

    setIsEditing(true);

    // 텍스트 입력을 위한 HTML 텍스트 입력 필드 생성
    const input = document.createElement("input");
    input.value = text;
    input.style.position = "absolute";
    input.style.top = textBox.absolutePosition().y + 90 + "px";
    input.style.left = textBox.absolutePosition().x + 140 + "px";
    input.style.width = textBox.width() + 20 + "px";

    document.body.appendChild(input);

    input.focus();

    input.addEventListener("keydown", (e) => {
      if (e.key === "Enter") {
        onTextChange(e.target.value);
        setIsEditing(false);
        document.body.removeChild(input);
      }
    });
  };

  const handleSelectedId = (id) => {
    console.log(id + " id 테스트용"); // id 값 로깅
    setSelectedId(id); // 상태 업데이트 호출
    // 이 시점에서는 상태 업데이트가 아직 반영되지 않았기 때문에,
    // 아래의 로그에서는 업데이트 이전의 selectedId 값이 출력됩니다.
    console.log(selectedId + " selected id 테스트용");
  };

  return (
    <>
      <Text
        ref={textRef}
        {...textProps}
        text={text}
        fontSize={fontSize}
        draggable
        x={position.x}
        y={position.y}
        ty="Text"
        style={{ zIndex: 10 }} // z-index 설정
        onClick={() => handleSelectedId(textProps.id)}
        // onDblClick={isEditing ? null : handleDblClick}
      />
      {isSelected && (
        <Transformer
          ref={transformerRef}
          boundBoxFunc={(oldBox, newBox) => {
            // 여기서 도형의 최소 크기 제한을 설정할 수 있습니다.
            if (newBox.width < 5 || newBox.height < 5) {
              return oldBox;
            }
            return newBox;
          }}
        />
      )}
    </>
  );
};

export default TextComponent;
