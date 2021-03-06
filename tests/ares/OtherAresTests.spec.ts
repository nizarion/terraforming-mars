import {expect} from 'chai';
import {DesertSettler} from '../../src/awards/DesertSettler';
import {Color} from '../../src/Color';
import {Game} from '../../src/Game';
import {Player} from '../../src/Player';
import {SpaceType} from '../../src/SpaceType';
import {TileType} from '../../src/TileType';
import {AresTestHelper, ARES_OPTIONS_NO_HAZARDS} from './AresTestHelper';

describe('OtherAresTests', function() {
  let player : Player;
  let otherPlayer: Player;
  let game : Game;

  it('Desert settler counts upgraded oceans', function() {
    player = new Player('test', Color.BLUE, false);
    otherPlayer = new Player('other', Color.RED, false);
    game = new Game('foobar', [player, otherPlayer], player, ARES_OPTIONS_NO_HAZARDS);

    const oceanSpace = game.board.getAvailableSpacesForOcean(player).filter((s) => s.y >= 5)[0];
    game.addOceanTile(player, oceanSpace.id);
    for (let n = 0; n < 8; n++) {
      AresTestHelper.addOcean(game, player);
    }

    const award = new DesertSettler();
    expect(award.getScore(player, game)).eq(0);

    game.addTile(player, SpaceType.OCEAN, oceanSpace, {tileType: TileType.OCEAN_CITY});

    expect(award.getScore(player, game)).eq(1);
  });
});
