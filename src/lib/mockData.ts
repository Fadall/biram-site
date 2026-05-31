import { Post } from './types';

export const mockPosts: Post[] = [
  {
    _id: '1',
    type: 'avant_propos',
    publishDate: '2026-05-03',
    slug: { current: 'avant-propos-03-05-2026' },
    authorSignature: 'BPF',
    body: [
      {
        _key: 'a',
        _type: 'block',
        children: [
          {
            _key: 'a1',
            _type: 'span',
            marks: [],
            text: 'Quand tout semble sombre, une certitude demeure : la lumière finit toujours par revenir.\n\nEt si l’espérance n’était pas une illusion, mais une loi silencieuse de la vie ?',
          },
        ],
        markDefs: [],
        style: 'normal',
      },
    ],
    relatedPost: {
      publishDate: '2026-05-04',
      slug: { current: 'le-jour-finit-toujours-par-se-lever' }
    }
  },
  {
    _id: '2',
    type: 'billet',
    publishDate: '2026-05-04',
    slug: { current: 'le-jour-finit-toujours-par-se-lever' },
    title: 'LE JOUR FINIT TOUJOURS PAR SE LEVER',
    closingLine: 'LA NUIT N’A JAMAIS LE DERNIER MOT',
    authorSignature: '@birampathefall',
    coverImage: '/bpf4.jpeg',
    body: [
      {
        _key: 'b1',
        _type: 'block',
        children: [{ _key: 'b1a', _type: 'span', marks: [], text: "Il n'y a pas de nuit assez noire pour empêcher le jour de se lever.\n\nCette phrase affirme une vérité simple et ancienne. Elle rappelle que l'obscurité, même profonde, ne possède jamais le dernier mot.\n\nLe jour finit toujours par se lever, non par miracle, mais par ordre naturel des choses. Cette certitude silencieuse accompagne l'humanité depuis toujours.\n\nDans l'histoire, les périodes les plus sombres ont souvent précédé des renaissances décisives. Après les guerres, les peuples ont reconstruit.\n\nAprès les famines, les terres ont refleuri. Victor Hugo écrivait déjà : ‘Même la nuit la plus sombre prendra fin et le soleil se lèvera’.\n\nCette phrase n'est pas une promesse naïve. Elle décrit un mouvement constant de la vie.\n\nDans l'existence personnelle, cette vérité se vérifie chaque jour. La maladie apprend la patience.\n\nLe deuil révèle la valeur de l'attachement. L'échec enseigne la persévérance.\n\nBeaucoup témoignent que leurs épreuves les ont conduits vers une clarté nouvelle. Nelson Mandela sortit de vingt-sept années de prison sans esprit de vengeance.\n\nIl choisit la réconciliation. Son parcours illustre la force tranquille du jour qui revient.\n\nLa nuit n'est donc pas un ennemi. Elle impose le silence, le recul et parfois l'humilité.\n\nElle oblige à écouter ce qui demeure quand tout semble perdu. Le jour, lui, apporte la lucidité et l'action.\n\nIl éclaire ce qui a mûri dans l'ombre.\n\nEspérer ne consiste pas à nier la nuit. Espérer consiste à marcher en sachant qu'elle a une fin.\n\nCette conviction donne la force d'avancer sans agitation. Elle invite à la constance, à la confiance et à la dignité.\n\nAucune nuit n'est assez noire pour arrêter le jour. Cette phrase n'endort pas.\n\nElle soutient. Elle rappelle que la lumière revient toujours pour ceux qui tiennent bon." }],
        markDefs: [],
        style: 'normal',
      }
    ]
  },
  {
    _id: '3',
    type: 'pensee',
    publishDate: '2026-05-09',
    slug: { current: 'la-solitude-feconde' },
    title: 'LA PENSÉE DU SAMEDI',
    subtitle: 'La solitude féconde',
    authorSignature: '@birampathefall',
    coverImage: '/pensee9.jpeg',
    body: [
      {
        _key: 'c1',
        _type: 'block',
        children: [{ _key: 'c1a', _type: 'span', marks: [], text: "La solitude n’est pas un vide. Elle est un espace.\n\nUn espace où le bruit se retire, où les regards s’effacent, où l’on cesse de se jouer un rôle.\n\nBeaucoup la redoutent, car elle confronte sans détour. Elle ne distrait pas, elle révèle.\n\nPourtant, c’est souvent dans cette retraite silencieuse que l’essentiel se clarifie.\n\nOn y retrouve ses priorités, ses vérités, parfois ses erreurs.\n\nLa solitude féconde ne coupe pas du monde. Elle prépare à mieux y revenir.\n\nElle n’isole pas, elle aligne.\n\nEt il arrive que ce temps, que l’on croyait vide, soit en réalité celui où l’on se rencontre enfin." }],
        markDefs: [],
        style: 'normal',
      }
    ]
  },
  {
    _id: '4',
    type: 'avant_propos',
    publishDate: '2026-05-05',
    slug: { current: 'avant-propos-05-05-2026' },
    authorSignature: 'BPF',
    body: [
      {
        _key: 'a',
        _type: 'block',
        children: [
          {
            _key: 'a1',
            _type: 'span',
            marks: [],
            text: 'L’autorité ne s’impose pas. Elle se construit dans l’écoute patiente des réalités humaines.\n\nEt si comprendre était le premier acte de gouverner?',
          },
        ],
        markDefs: [],
        style: 'normal',
      },
    ],
    relatedPost: {
      publishDate: '2026-05-06',
      slug: { current: 'gouverner-autrement' }
    }
  },
  {
    _id: '5',
    type: 'billet',
    publishDate: '2026-05-06',
    slug: { current: 'gouverner-autrement' },
    title: 'GOUVERNER AUTREMENT',
    closingLine: 'DU SOMMET AU TERRAIN',
    authorSignature: '@birampathefall',
    coverImage: '/bpf6.jpeg',
    body: [
      {
        _key: 'b1',
        _type: 'block',
        children: [{ _key: 'b1a', _type: 'span', marks: [], text: "'Gouverner, ce n’est pas commander d’en haut. C’est comprendre depuis le bas.'\n\n Cette phrase rappelle une exigence essentielle du pouvoir. Gouverner suppose une écoute réelle. \n\nElle demande une présence attentive au quotidien des citoyens. Le pouvoir trouve sa justesse quand il part des réalités vécues. \n\nL’histoire offre de nombreux exemples. Abraham Lincoln affirmait que la démocratie reposait sur le gouvernement du peuple, par le peuple et pour le peuple. \n\nCette formule souligne une idée simple. L’autorité gagne sa légitimité quand elle s’enracine dans la compréhension des besoins concrets. \n\nElle s’affaiblit quand elle s’enferme dans les sommets. \n\nComprendre depuis le bas signifie observer, écouter et apprendre. Cela implique de reconnaître les contraintes du travail, les fragilités sociales et les attentes ordinaires. \n\nUn dirigeant qui se rend sur le terrain découvre des vérités absentes des rapports. Il perçoit les effets réels des décisions publiques. \n\nIl ajuste alors son action avec discernement. \n\nDes figures contemporaines ont illustré cette approche. Nelson Mandela passait du temps à écouter ses adversaires et les plus modestes. \n\nIl croyait à la force de l’écoute patiente. Il disait que parler à quelqu’un, c’est d’abord apprendre de lui. \n\nCette attitude nourrit la réconciliation et la stabilité. \n\nGouverner depuis le bas favorise la confiance. Les citoyens se sentent reconnus. \n\nIls acceptent plus volontiers l’effort commun. La cohésion sociale s’en trouve renforcée. \n\nL’action publique gagne en efficacité. \n\nLe commandement vertical produit la distance. Il crée l’incompréhension et la défiance. \n\nLa compréhension attentive produit l’adhésion. Elle éclaire les choix et réduit les tensions. \n\nGouverner demande donc une posture humble. Elle exige du temps et du courage. \n\nElle repose sur une conviction claire. Le pouvoir sert mieux quand il commence par écouter." 
        }],
        markDefs: [],
        style: 'normal',
      }
    ]
  },
  {
    _id: '6',
    type: 'avant_propos',
    publishDate: '2026-05-07',
    slug: { current: 'avant-propos-07-05-2026' },
    authorSignature: 'BPF',
    body: [
      {
        _key: 'a',
        _type: 'block',
        children: [
          {
            _key: 'a1',
            _type: 'span',
            marks: [],
            text: 'Le "teggin" transforme le refus en acte de considération.\n\nComment apprendre à protéger la relation tout en affirmant ses limites??',
          },
        ],
        markDefs: [],
        style: 'normal',
      },
    ],
    relatedPost: {
      publishDate: '2026-05-08',
      slug: { current: 'dire-non-sans-briser' }
    }
  },
  {
    _id: '7',
    type: 'billet',
    publishDate: '2026-05-08',
    slug: { current: 'dire-non-sans-briser' },
    title: 'DIRE NON SANS BRISER',
    closingLine: 'LE "TEGGIN", UNE ECOLE DE RESPECT',
    authorSignature: '@birampathefall',
    coverImage: '/bpf8.jpeg',
    body: [
      {
        _key: 'b1',
        _type: 'block',
        children: [{ _key: 'b1a', _type: 'span', marks: [], text: "'Comment dire non sans casser le lien?'\n\nLe fameux 'teggin' sénégalais.\n\nDire non représente un acte délicat. Dans la culture sénégalaise, ce refus direct peut blesser, rompre l’harmonie et fragiliser la relation.\n\nLe 'teggin' s’est imposé comme une réponse sociale à cette difficulté. Il permet d’exprimer un refus sans brutalité, en protégeant le lien avant tout.\n\nLe 'teggin' repose sur une logique simple. La relation compte autant que la demande.\n\nRefuser ne signifie pas rejeter la personne. Il s’agit plutôt de préserver sa dignité et celle de l’autre.\n\nOn temporise, on explique, on détourne parfois la réponse. Le non devient implicite, enveloppé de respect.\n\nDans la vie quotidienne, ce mécanisme apparaît souvent. Lorsqu’un parent sollicite une aide impossible à accorder, on évoque une contrainte future.\n\nLorsqu’un ami demande un service excessif, on promet d’y réfléchir. La réponse réelle se lit dans le ton, le regard, le silence.\n\nChacun comprend sans humiliation.\n\nCe savoir relationnel trouve sa sagesse dans l’expérience collective. Un proverbe wolof rappelle que la parole peut guérir ou blesser.\n\nLe 'teggin' choisit la guérison. Il évite la confrontation inutile.\n\nIl laisse à l’autre une porte de sortie honorable.\n\nCette pratique enseigne une leçon plus large. La communication ne se limite pas aux mots.\n\nElle engage l’attention, l’empathie et le sens du moment. Dire non avec douceur exige du temps et une conscience fine de l’autre.\n\nCela demande parfois plus d’effort que l’affirmation brute.\n\nDans un monde pressé, le teggin offre une alternative apaisée. Il rappelle que la franchise peut s’exprimer avec délicatesse.\n\nLe lien humain mérite protection. Le refus n’a pas vocation à rompre.\n\nIl peut devenir un acte de respect.\n\nDire non sans casser le lien demeure un art. Le 'teggin' en propose une forme aboutie.\n\nIl incarne une sagesse relationnelle précieuse" 
        }],
        markDefs: [],
        style: 'normal',
      }
    ]
  }
];
