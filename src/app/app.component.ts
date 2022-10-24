import { Component, NgModule, OnInit } from '@angular/core';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { Router, NavigationEnd } from '@angular/router';
import { filter } from 'rxjs/operators';

declare let gtag: Function;

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html'
})

export class AppComponent implements OnInit {

  layout: string;

  constructor(
    private responsive: BreakpointObserver,
    private router: Router
  ) {}

  async ngOnInit() {
    this.setUpAnalytics();
    this.responsive.observe('(min-width: 550px)')
      .subscribe(result => {
        if (result.matches) {
          this.layout = 'desktop';
        } else {
          this.layout = 'mobile';
        }
      });
  }

  getSections() {
    return [
      {
        title: 'Node',
        cards: [{
          title: 'Amboss',
          description: 'I run Cold Sats bare metal (RaspiBolt) on an ASRock x300, Ryzen 7, 2x2TB NVMe RAID 1 + 32GB ram. I built this little beast of a machine to last.',
          image: 'assets/images/amboss.svg',
          url: 'https://amboss.space/c/coldsats'
        },
        {
          title: 'Terminal Web',
          description: 'Cold Sats is currently ranked top 50 in Terminal Web. Success to me would be falling out of the top 1,000 in the next decade.',
          image: 'assets/images/terminal-web.svg',
          url: 'https://terminal.lightning.engineering/#/020a3dce2dab038955eb435a8342e4fe897304015314485d3738d5f41eccb47859'
        }]
      },
      {
        title: 'Github',
        cards: [{
          title: 'ln-charts',
          description: 'ln-charts parses bos accounting reports into various charts for your Lightning Node. Free, private and open source.',
          image: 'assets/images/ln-charts.svg',
          url: 'https://github.com/cold-sats/ln-charts'
        },
        {
          title: 'tao-web',
          description: 'tao-web is a Bitcoin wallet that utilizes the tao-wallet npm package to let you swap bitcoin between Bitcoin USD.',
          image: 'assets/images/tao-web.svg',
          url: 'https://github.com/cold-sats/tao-web'
        },
        {
          title: 'coldsats.io',
          description: 'I built this website as a home for my Bitcoin related projects and articles. Check back in the future to see where I go with this.',
          image: 'assets/images/cold-sats.svg',
          url: 'https://github.com/cold-sats/coldsats'
        }]
      },
      {
        title: 'Medium',
        cards: [
          {
            title: this.layout == 'mobile' ? 'Bootstrap a Node' : 'How to Bootstrap a Profitable Lightning Node',
            description: this.layout == 'mobile' ? 'How to Bootstrap a Profitable Lightning Node: learnings from a top 100 node to help illuminate your path.' : 'Learnings from a top 100 node to help illuminate your path.',
            image: 'assets/images/bootstrap.svg',
            url: 'https://medium.com/@cold_sats/how-to-bootstrap-a-profitable-lightning-node-8de72beac59c'
          },
          {
            title: this.layout == 'mobile' ? 'Migrate LND to RaspiBolt' : 'How to Migrate LND From myNode or Umbrel to RaspiBolt',
            description: this.layout == 'mobile' ? 'How to Migrate LND From myNode or Umbrel to RaspiBolt: a step-by-step list of commands to level your node up.' : 'A step-by-step list of commands to level your node up.',
            image: 'assets/images/how-to-migrate.svg',
            url: 'https://medium.com/@cold_sats/how-to-migrate-lnd-from-mynode-to-raspibolt-ubuntu-server-e6089a92eae7'
          }
        ]
      },
      {
        title: 'Twitter',
        cards: [
          {
            title: 'Monthly Update',
            description: 'Each month I share earnings, stats and a few charts for my Lightning node. I share everything. Probably too much.',
            image: 'assets/images/monthly-update.svg',
            url: 'https://twitter.com/cold_sats/status/1488892842739003393?s=20&t=dP8h_ISgLbtQlwFf1OJALw'
          },
          {
            title: '6 Month Update',
            description: 'Here are 6 charts from my first 6 months running a node. I plan to post a bigger update every 6 months.',
            image: 'assets/images/6-month-update.svg',
            url: 'https://twitter.com/cold_sats/status/1524028405032837120?s=20&t=dP8h_ISgLbtQlwFf1OJALw'
          },
          {
            title: this.layout == 'mobile' ? 'Node Migration Guide' : 'Lightning Node Migration Guide',
            description: 'I migrated my Lightning node from a pi4 to an ASRock x300. Here\’s a high level of the build and migration (commands are in the medium article).',
            image: 'assets/images/migration.svg',
            url: 'https://twitter.com/cold_sats/status/1495126848631496704?s=20&t=dP8h_ISgLbtQlwFf1OJALw'
          }
        ]
      },
      {
        title: 'Telegram',
        cards: [{
          title: 'Hit Me Up',
          description: 'I’m on Plebnet and other Lightning groups. Shoot me a DM with any questions about Lightning. Let\'s do cool Bitcoin things.',
          image: 'assets/images/telegram.svg',
          url: 'https://t.me/cold_sats'
        }]
      }
    ];
  }

  setUpAnalytics() {
    this.router.events.pipe(filter(event => event instanceof NavigationEnd))
        .subscribe((event: NavigationEnd) => {
            gtag('config', 'G-R28CRD02MV',
                {
                    page_path: event.urlAfterRedirects
                }
            );
        });
  }

}
