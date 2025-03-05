using System;
using AutoMapper;
using Domain;

namespace Application.Mappings;

public class MappingProfile : Profile
{
    public MappingProfile()
    {
        CreateMap<Domain.Activity, Domain.DTO.EditActivityDto>().ReverseMap();
        CreateMap<Activity, Activity>().ForMember(x => x.Id, opt => opt.Ignore());
    }

}
