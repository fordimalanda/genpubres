using Backend.Models;

namespace Backend.Services;

public interface IDeepSeekService
{
    Task<DeclineResult> DeclineAsync(DeclineRequest request);
}