import React, { useState } from "react";
import { Box, Stack, Text } from "@chakra-ui/react";
import frontUtils from "@src/shared/front-utils";

const Rating = React.forwardRef(
  (
    {
      emptyIcon,
      fillIcon,
      scale,
      onChange,
      value,
      readOnly = false,
      showTitle = true,
      ...props
    },
    ref
  ) => {
    const [rating, setRating] = useState(value);
    const buttons = [];

    const onClick = (idx) => {
      if (readOnly) return;
      if (!isNaN(idx)) {
        // allow user to click first icon and set rating to zero if rating is already 1
        if (rating === 1 && idx === 1) {
          setRating(0);
          onChange(0);
        } else {
          setRating(idx);
          onChange(idx);
        }
      }
    };

    const RatingIcon = ({ fill }) => {
      return (
        <>
          {!fill && emptyIcon} {fill && fillIcon}
        </>
      );
    };

    const RatingButton = ({ idx, fill }) => {
      return (
        <Box
          as="button"
          aria-label={`Rate ${idx}`}
          variant="unstyled"
          mx={1}
          onClick={() => onClick(idx)}
          _focus={{ outline: 0 }}
        >
          <RatingIcon fill={fill} />
        </Box>
      );
    };

    for (let i = 1; i <= scale; i++) {
      buttons.push(<RatingButton key={i} idx={i} fill={i <= rating} />);
    }

    return (
      <Stack isInline justify="start" alignItems="center" {...props}>
        <input name="rating" type="hidden" value={rating} ref={ref} />
        {buttons}
        <Box textAlign="center">
          {showTitle && (
            <>
              <Text fontSize="sm" textTransform="uppercase">
                Rating
              </Text>
              <Text
                fontSize="2xl"
                fontWeight="semibold"
                lineHeight="1.2em"
                ml={3}
              >
                {frontUtils.round(rating)}
              </Text>
            </>
          )}
        </Box>
      </Stack>
    );
  }
);

Rating.displayName = "Rating";

export default Rating;
