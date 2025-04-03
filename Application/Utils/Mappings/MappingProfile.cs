using System;
using Application.Activities.DTO;
using Application.Activities.DTO.Profiles;
using AutoMapper;
using Domain;

namespace Application.Mappings;

public class MappingProfile : Profile
{
    public MappingProfile()
    {
        string? currentUserId = null!;
        CreateMap<Domain.Activity, EditActivityDto>().ReverseMap();
        CreateMap<Activity, Activity>().ForMember(x => x.Id, opt => opt.Ignore());
        CreateMap<CreateActivityDto, Activity>();
        CreateMap<Activity, ActivityReturnDto>()
        .ForMember(d => d.HostDisplayName,
            s => s.MapFrom(s => s.Attendees.FirstOrDefault(x => x.IsHost)
            !.User.DisplayName))
        .ForMember(d => d.HostId,
            s => s.MapFrom(s => s.Attendees.FirstOrDefault(x => x.IsHost)
            !.User.Id))
        .ForMember(d => d.Attendees, s => s.MapFrom(s => s.Attendees));

        CreateMap<User, UserProfile>();


        CreateMap<ActivityAttendee, UserProfile>()
        .ForMember(d => d.DisplayName, s => s.MapFrom(s => s.User.DisplayName))
        .ForMember(d => d.ImageUrl, s => s.MapFrom(s => s.User.ImageUrl))
        .ForMember(d => d.Bio, s => s.MapFrom(s => s.User.Bio))
        .ForMember(d => d.Id, s => s.MapFrom(s => s.User.Id))
        .ForMember(d => d.FollowersCount, s => s.MapFrom(s => s.User.Followers.Count))
        .ForMember(d => d.FollowingCount, s => s.MapFrom(s => s.User.Followings.Count))
        .ForMember(d => d.IsFollowing, s => s.MapFrom(x => x.User.Followers.Any(x => x.ObserverId == currentUserId)));


        CreateMap<Comment, CommentDto>()
        .ForMember(d => d.DisplayName, s => s.MapFrom(s => s.User.DisplayName))
        .ForMember(d => d.ImageUrl, s => s.MapFrom(s => s.User.ImageUrl))
        .ForMember(d => d.UserId, s => s.MapFrom(s => s.User.Id));

        CreateMap<User, UserProfile>()
        .ForMember(d => d.FollowersCount, s => s.MapFrom(s => s.Followers.Count))
        .ForMember(d => d.FollowingCount, s => s.MapFrom(s => s.Followings.Count))
        .ForMember(d => d.IsFollowing, s => s.MapFrom(x => x.Followers.Any(x => x.ObserverId == currentUserId)));
    }

}
