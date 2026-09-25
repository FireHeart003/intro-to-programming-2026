using Marten;
using Microsoft.AspNetCore.Http.Timeouts;
using Microsoft.AspNetCore.Mvc;
using System.ComponentModel.DataAnnotations;

namespace ParkingLot.Api.Items;

[ApiController]
public class ItemsController(IDocumentSession session) : ControllerBase
{

    [HttpDelete("/parking-lot/{id:guid}/notes/{noteId:guid}")]
    public async Task<ActionResult> DeleteNoteAsync(
        [FromRoute] Guid id,
        [FromRoute] Guid noteId,
        CancellationToken token
    )
    {
        var entity = await session.LoadAsync<ParkingLotEntity>(id, token);
        if(entity is null)
        {
            return NotFound();
        }
        var noteToDelete = entity.Notes.FirstOrDefault(n => n.Id == noteId);
        if(noteToDelete is null)
        {
            return NotFound();
        }
        entity.Notes = [.. entity.Notes.Where(n => n.Id != noteId)];
        session.Store(entity);
        await session.SaveChangesAsync();
        return NoContent();
    }

    [HttpPost("/parking-lot/{id:guid}/notes")]
    public async Task<ActionResult<Note>> AddNoteAsync(
        [FromRoute] Guid id,
        [FromBody] NoteCreateItem note,
        TimeProvider clock,
        CancellationToken token
        )
    {
        var entity = await session.LoadAsync<ParkingLotEntity>(id, token);
        if(entity is null)
        {
            return NotFound();
        }
        var noteToAdd = new Note
        {
            Id = Guid.NewGuid(),
            Content = note.Content,
            Added = clock.GetUtcNow()
        };
        entity.Notes = [.. entity.Notes, noteToAdd];
        session.Store(entity);
        await session.SaveChangesAsync(token);
        return Ok(noteToAdd);
    }
    [HttpPost("/parking-lot")]
    public async Task<ActionResult<ParkingLotDetailsItem>> AddAsync(
        [FromBody] ParkingLotCreateItem request,
        TimeProvider clock
        )
    {
        // do not do this. this is a fake delay, etc.
        await Task.Delay(3000);
        var entityToSave = new ParkingLotEntity
        {
            Id = Guid.NewGuid(),
            Created = clock.GetUtcNow(),
            Description = request.Description,
            Title = request.Title

        };
        session.Store(entityToSave);
        await session.SaveChangesAsync();
        var result = new ParkingLotDetailsItem
        {
            Id = entityToSave.Id,
            Title = entityToSave.Title,
            Created = entityToSave.Created,
            Description = entityToSave.Description,
            Notes = entityToSave.Notes,
        };
        return CreatedAtRoute("item-added", new { id = result.Id }, result); // 201 with a location header
    }

    [HttpGet("/parking-lot/{id:guid}", Name ="item-added")]
    public async Task<ActionResult<ParkingLotDetailsItem>> GetItemByIdAsync(Guid id, CancellationToken token)
    {

        var result = await session.Query<ParkingLotEntity>()
              .Where(p => p.Id == id)
      .Select(p => new ParkingLotDetailsItem() // Representation to send to the client.
      {
          Id = p.Id,
          Created = p.Created,
          Description = p.Description,
          Notes = p.Notes,
          Title = p.Title,
         
      })
    
      .SingleOrDefaultAsync(token);

        if(result is not null)
        {
            return Ok(result);
        } else
        {
            return NotFound();
        }
    }

    [HttpGet("/parking-lot")]
    public async Task<ActionResult<IReadOnlyList<ParkingLotSummaryItem>>> GetItemsAsync(CancellationToken token )
    {
       
        var result = await session.Query<ParkingLotEntity>()
            .Select(p => new ParkingLotSummaryItem() // Representation to send to the client.
            {
                Id = p.Id,
                Created = p.Created,
                Description = p.Description,
                Title = p.Title
            })
            .ToListAsync(token);
        return Ok(result);
    }
}

/*export type ParkingLotItem = {
  id: string;
  title: string;
  description: string;
  created: string;
};*/

public record ParkingLotSummaryItem
{
    public Guid Id { get; set; }
    public string Title { get; set; } = string.Empty;
    public string Description { get; set; } = string.Empty;
    public DateTimeOffset Created { get; set; }
}

public record ParkingLotDetailsItem
{
    public Guid Id { get; set; }
    public string Title { get; set; } = string.Empty;
    public string Description { get; set; } = string.Empty;
    public DateTimeOffset Created { get; set; }
    public IReadOnlyList<Note> Notes { get; set; } = new List<Note>();
}

public record ParkingLotCreateItem
{
    [Required, MinLength(5), MaxLength(100)]
    public string Title { get; set; } = string.Empty;
    [MaxLength(500)]
    public string Description { get; set; } = string.Empty;
}


public class ParkingLotEntity
{
    public Guid Id { get; set; }
    public string Title { get; set; } = string.Empty;
    public string Description { get; set; } = string.Empty;
    public DateTimeOffset Created { get; set; }
    public IReadOnlyList<Note> Notes { get; set; }= new List<Note>();
    //public bool MarkedAsLearned { get; set; } = false;

}

public record Note
{
    public Guid Id { get; set; }
    public string Content { get; set; } = string.Empty;
    public DateTimeOffset Added { get; set; }
 }

public record NoteCreateItem
{
    [Required, MinLength(1), MaxLength(500)]
    public string Content { get; set; } = string.Empty;
}