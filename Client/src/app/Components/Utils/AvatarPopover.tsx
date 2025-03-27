import * as React from "react";
import Popover from "@mui/material/Popover";
import { Profile } from "../../../Domain/Profile";
import { Avatar } from "@mui/material";
import { Link } from "react-router-dom";
import ProfileCard from "../Profile/ProfileCard";

interface AvatarPopoverProps {
  profile: Profile;
}

export default function AvatarPopover({ profile }: AvatarPopoverProps) {
  const [anchorEl, setAnchorEl] = React.useState<HTMLElement | null>(null);

  const handlePopoverOpen = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handlePopoverClose = () => {
    setAnchorEl(null);
  };

  const open = Boolean(anchorEl);

  return (
    <div>
      <Avatar
        src={profile.imageUrl || undefined}
        alt={profile.displayName}
        component={Link}
        to={`/profiles/${profile.id}`}
        onMouseEnter={handlePopoverOpen}
        onMouseLeave={handlePopoverClose}
        sx={{ height: 40, width: 40, mr: 1 }}
      />
      <Popover
        id="mouse-over-popover"
        sx={{ pointerEvents: "none" }}
        open={open}
        anchorEl={anchorEl}
        anchorOrigin={{
          vertical: "bottom",
          horizontal: "left",
        }}
        transformOrigin={{
          vertical: "top",
          horizontal: "left",
        }}
        onClose={handlePopoverClose}
        disableRestoreFocus
      >
        <ProfileCard profile={profile} />
      </Popover>
    </div>
  );
}
