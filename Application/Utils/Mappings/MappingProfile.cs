using System;
using Application.Activities.DTO;
using AutoMapper;
using Domain;

namespace Application.Mappings;

public class MappingProfile : Profile
{
    public MappingProfile()
    {
        CreateMap<Domain.Activity, EditActivityDto>().ReverseMap();
        CreateMap<Activity, Activity>().ForMember(x => x.Id, opt => opt.Ignore());
        CreateMap<CreateActivityDto, Activity>();
    }

}
