import { Image, chakra, Tooltip, Link } from "@chakra-ui/react";
import frontUtils from "@src/shared/front-utils";
import Blockies from "react-blockies";
const BlockiesChakra = chakra(Blockies);

const DaoAvatar = ({
  dao,
  showTooltip = false,
  wrapInLink = false,
  hasHoverEffect = false,
  ...props
}) => {
  const hoverEffectStyle = {
    transition: "all .2s ease-in-out",
    _hover: { transform: "scale(1.4)" },
  };
  let componenet = (
    <Image
      borderRadius={"50%"}
      backgroundColor="#eaeaea"
      border="1px solid black"
      src={frontUtils.resolveIPFSLink(dao.avatar)}
      alt="dao avatar"
      fallback={
        <BlockiesChakra
          borderRadius={"50%"}
          seed={dao.daoSnapshotId || dao.id || dao.name || "random"}
          size={9}
          scale={4}
          className="daoidenticon"
          {...props}
          {...(hasHoverEffect && hoverEffectStyle)}
        />
      }
      {...props}
      {...(hasHoverEffect && hoverEffectStyle)}
    />
  );
  if (showTooltip) {
    componenet = (
      <Tooltip
        label={dao.name}
        hasArrow
        bg="gray.100"
        color="black"
        aria-label="A tooltip"
      >
        {componenet}
      </Tooltip>
    );
  }
  if (wrapInLink) {
    componenet = (
      <Link
        href={`/daos/${dao.daoSnapshotId || dao.id}`}
        isExternal={false}
        _hover={{ textDecoration: "none" }}
      >
        {componenet}
      </Link>
    );
  }
  return componenet;
};

export default DaoAvatar;
